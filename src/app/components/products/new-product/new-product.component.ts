import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { FileUpload, FileUploadHandlerEvent } from "primeng/fileupload";
import { Observable, catchError, forkJoin, map, throwError } from "rxjs";
import { CountryService } from "src/app/service/country.service";
import { ProductService } from "src/app/service/product.service";
import { ImageUploadService } from "src/app/service/upload.service";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
})
export class NewProductComponent {
  brands: any[] = [];

  categories: any[];

  filteredBrands: any[] = [];

  productForm!: FormGroup;

  @ViewChild("mainProductImage") mainImageUpload!: FileUpload;
  @ViewChild("otherProductImages") otherProductImagesUpload!: FileUpload;

  constructor(
    private brandService: CountryService,
    private messageService: MessageService,
    private productSvc: ProductService,
    private imageUplSvc: ImageUploadService
  ) {
    this.categories = [
      { name: "Electronics", code: "EN" },
      { name: "Clothing", code: "CL" },
      { name: "Shoes", code: "SH" },
      { name: "Mobile Phone", code: "MP" },
      { name: "Watches", code: "WA" },
      { name: "Accessories", code: "ACC" },
    ];
  }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      serial: new FormControl("", [Validators.required]),
      batch: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
      manufacturer: new FormControl("", [Validators.required]),
      manufacturedDate: new FormControl("", [Validators.required]),
      availableColors: new FormControl(""),
      desc: new FormControl("", [Validators.required]),
      mainImage: new FormControl(""),
    });

    this.brandService.getBrands().subscribe((res) => {
      this.brands = res.data;
    });
  }

  searchBrands(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.brands.length; i++) {
      const brand = this.brands[i];
      if (brand.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(brand);
      }
    }

    this.filteredBrands = filtered;
  }

  onMultipleFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: "info",
      detail: "Product Images upload",
      summary: "All product images will be uploaded on submit",
    });
  }

  onMainImageFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: "info",
      detail: "Product Images upload",
      summary: "All product images will be uploaded on submit",
    });
  }

  productFormSubmit(): void {
    console.log("product form submit");
    //check form validity
    if (this.mainImageUpload._files.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Main Product Image is required!",
        detail: "Main product image is required when creating a product",
      });
      return;
    }

    if (this.otherProductImagesUpload._files.length < 1) {
      this.messageService.add({
        severity: "error",
        summary: "Product Images are required!",
        detail: "Kindly ensure you provide atleast one product image",
      });
      return;
    }

    // uploading images
    this.uploadAllImages().subscribe({
      next: (res: string[]) => {
        console.log("response", res);
        // save product
        let productData = this.productForm.value;
        productData = {
          ...productData,
          mainImage: res[0],
        };
        this.saveProduct(productData);

        // save product images
        this.saveAllProductImages(productData.name, res.slice(1));
      },
      error: (err: any) => {
        console.log("error", err)
        this.messageService.add({
          severity: "error",
          summary: "Error Uploading Image",
          detail: err,
        });
      },
    });
  }

  saveProduct(product: any): void {
    const date = new Date(product.manufacturedDate);
    product = {
      ...product,
      manufacturedDate: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    };

    // create the product
    this.productSvc.createProduct(product).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: "success",
          summary: "Product Created Successfully!",
          detail: res.message,
        });
      },
      error: (err) => {
        console.log("err", err);
        this.messageService.add({
          severity: "error",
          summary: "Error Creating Product!",
          detail: err.error.message,
        });
      },
    });
  }

  saveProductImage(data: any): Observable<any> {
    return this.productSvc.addProductImage(data).pipe(
      map((res) => res.data),
      catchError((err) => {
        console.log("save prod image error", err)
        throw err.error.message;
      })
    );
  }

  uploadImage(file: any): Observable<string> {
    let data = new FormData(); // creating form data
    data.append("file", file);

    return this.imageUplSvc.uploadProductImage(data).pipe(
      map((res: any) => res.data),
      catchError((err: any) => {
        console.log("upload image err", err)
        throw err.error.message;
      })
    );
  }

  uploadAllImages(): Observable<string[]> {
    // upload all product images using rxjs forkJoin
    let uplImgObservables: Observable<string>[] = [
      this.uploadImage(this.mainImageUpload._files[0]),
    ];

    // adding other images
    this.otherProductImagesUpload._files.forEach((f) => {
      uplImgObservables.push(this.uploadImage(f));
    });

    return forkJoin(uplImgObservables);
  }

  saveAllProductImages(productName: string, imageUrls: string[]): void {
    // add all product images using rxjs forkJoin
    const saveProdImages: Observable<string>[] = imageUrls.map((img, i) =>
      this.saveProductImage({
        productName,
        title: productName + "-image-" + i,
        color: "unknown",
        url: img,
      })
    );

    forkJoin(saveProdImages).subscribe({
      next: (res: any) => {
        console.log("response product image add", res);
        this.messageService.add({
          severity: "success",
          summary: "Product Created Successfully!",
          detail: res.message,
        });
      },
      error: (err: any) => {
        console.log("err", err);
        this.messageService.add({
          severity: "error",
          summary: "Error Creating Product Image!",
          detail: err.error.message,
        });
      },
    });
  }
}
