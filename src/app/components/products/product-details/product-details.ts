import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FileUpload, FileUploadHandlerEvent } from "primeng/fileupload";
import { Observable, catchError, forkJoin, map, of } from "rxjs";
import { CountryService } from "src/app/service/country.service";
import { ProductService } from "src/app/service/product.service";
import { ImageUploadService } from "src/app/service/upload.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.html",
})
export class ProductDetailsComponent {
  brands: any[] = [];

  categories: any[];

  filteredBrands: any[] = [];

  productDetailsForm!: FormGroup;
  product: any;

  @ViewChild("mainProductImage") mainImageUpload!: FileUpload;
  @ViewChild("otherProductImages") otherProductImagesUpload!: FileUpload;

  submitting: boolean = false;

  constructor(
    private brandService: CountryService,
    private messageService: MessageService,
    private productSvc: ProductService,
    private imageUplSvc: ImageUploadService,
    private dialogConfig: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    // gett the data from dialog config
    if (dialogConfig.data) {
      this.product = dialogConfig.data;
      const date = new Date(this.product.manufacturedDate);
      this.product.manufacturedDate = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
    }

    this.categories = [
      { name: "Electronics", code: "EN" },
      { name: "Clothing", code: "CL" },
      { name: "Shoes", code: "SH" },
      { name: "Mobile Phones", code: "MP" },
      { name: "Watches", code: "WA" },
      { name: "Accessories", code: "ACC" },
      { name: "Television", code: "TV" },
    ];
  }

  ngOnInit() {
    let productCat = this.categories.filter(
      (cat) => cat.name === this.product.category
    )[0];

    if (!productCat) {
      productCat = { name: this.product.category, code: this.product.category };
      this.categories.push({
        name: this.product.category,
        code: this.product.category,
      });
    }

    this.productDetailsForm = new FormGroup({
      name: new FormControl(this.product.name, [Validators.required]),
      brand: new FormControl(this.product.brand, [Validators.required]),
      category: new FormControl(productCat, [Validators.required]),
      price: new FormControl(this.product.price, [Validators.required]),
      serial: new FormControl(this.product.serial, [Validators.required]),
      batch: new FormControl(this.product.batch, [Validators.required]),
      quantity: new FormControl(this.product.quantity, [Validators.required]),
      manufacturer: new FormControl(this.product.manufacturer, [
        Validators.required,
      ]),
      manufacturedDate: new FormControl(this.product.manufacturedDate, [
        Validators.required,
      ]),
      availableColors: new FormControl(this.product.availableColors),
      desc: new FormControl(this.product.desc, [Validators.required]),
      rating: new FormControl(this.product.rating ? this.product.rating : 1, [
        Validators.required,
      ]),
      mainImage: new FormControl(this.product.mainImage),
      sizes: new FormControl(this.product.sizes ? this.product.sizes.split(",") : "", [Validators.required])
    });

    this.brandService.getBrands().subscribe((res) => {
      this.brands = res.data;
      let productBrand = this.brands.filter(
        (b) => b.name === this.product.brand
      )[0];

      if (!productBrand) {
        productBrand = { name: this.product.brand, code: this.product.brand };
        this.brands.push({
          name: this.product.brand,
          code: this.product.brand,
        });
      }

      this.productDetailsForm.patchValue({
        brand: productBrand,
      });
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
    // uploading images
    this.uploadAllImages().subscribe({
      next: (res: string[]) => {
        this.submitting = true;
        console.log("response", res);
        // save product
        let productData = this.productDetailsForm.value;
        productData = {
          ...productData,
          mainImage:
            this.mainImageUpload._files.length > 0
              ? res[0]
              : this.product.mainImage,
        };

        this.updateProduct(
          productData,
          this.otherProductImagesUpload._files.length > 0 &&
            this.mainImageUpload._files.length > 0
            ? res.slice(1)
            : this.mainImageUpload._files.length < 1 &&
              this.otherProductImagesUpload._files.length > 0
            ? res
            : []
        );

        this.submitting = false;
      },
      error: (err: any) => {
        this.submitting = false;
        console.log("error", err);
        this.messageService.add({
          severity: "error",
          summary: "Error Uploading Image",
          detail: err.error.message ? err.error.message : err.message,
        });
      },
    });
  }

  updateProduct(product: any, otherImgUrls: string[]): void {
    const date = new Date(product.manufacturedDate);
    product = {
      ...product,
      brand: product.brand.name ? product.brand.name : product.brand,
      category: product.category.name
        ? product.category.name
        : product.category,
      availableColors: "black, gray",
      sizes: product.sizes.join(),
      quantity: parseInt(product.quantity),
      price: parseFloat(product.price),
      manufacturedDate: `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`,
    };

    console.log("product", product);
    // create the product
    this.productSvc.updateProduct(this.product.name, product).subscribe({
      next: (res: any) => {
        this.messageService.add({
          severity: "success",
          summary: "Product Updated Successfully!",
          detail: res.message ? res.message : res,
        });

        // save product images
        this.saveAllProductImages(res.data[0].name, otherImgUrls);

        // close dialog
        this.ref.close();
      },
      error: (err: any) => {
        this.submitting = false;
        console.log("err", err);
        this.messageService.add({
          severity: "error",
          summary: "Error Updating Product!",
          detail: err.error.message ? err.error.message : err.message,
        });
      },
    });
  }

  saveProductImage(data: any): Observable<any> {
    return this.productSvc.addProductImage(data).pipe(
      map((res) => res.data[0].url),
      catchError((err) => {
        console.log("save prod image error", err);
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
        console.log("upload image err", err);
        throw err.error.message;
      })
    );
  }

  uploadAllImages(): Observable<string[]> {
    // upload all product images using rxjs forkJoin
    let uplImgObservables: Observable<string>[] =
      this.mainImageUpload._files.length > 0
        ? [this.uploadImage(this.mainImageUpload._files[0])]
        : [];

    // adding other images
    this.otherProductImagesUpload._files.length > 0
      ? this.otherProductImagesUpload._files.forEach((f) => {
          uplImgObservables.push(this.uploadImage(f));
        })
      : null;

    if (uplImgObservables.length < 1) return of([]);

    return forkJoin(uplImgObservables);
  }

  saveAllProductImages(productName: string, imageUrls: string[]): void {
    // add all product images using rxjs forkJoin
    const saveProdImages: Observable<string>[] =
      imageUrls.length > 0
        ? imageUrls.map((img, i) =>
            this.saveProductImage({
              productName,
              title: productName + "-image-" + i,
              color: "unknown",
              url: img,
            })
          )
        : [];

    forkJoin(saveProdImages).subscribe({
      next: (res: any) => {
        console.log("response product image add", res);
        this.messageService.add({
          severity: "success",
          summary: "Product Images Created Successfully!",
          detail: "Added product images",
        });

        // close modal
        this.ref.close();
      },
      error: (err: any) => {
        this.submitting = false;
        console.log("err", err);
        this.messageService.add({
          severity: "error",
          summary: "Error Creating Product Image!",
          detail: err.error.message ? err.error.message : err.message,
        });
      },
    });
  }

  clearForm(): void {
    this.productDetailsForm.reset();
    this.mainImageUpload.clear();
    this.otherProductImagesUpload.clear();
  }
}
