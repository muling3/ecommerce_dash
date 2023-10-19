import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  constructor(
    private messageService: MessageService,
    private productSvc: ProductService,
    private fileUplSvc: FileUploadService
  ) {}

  productForm!: FormGroup;

  @ViewChild('mainProductImage') mainImageUpload!: FileUpload;
  @ViewChild('otherProductImages') otherProductImagesUpload!: FileUpload;

  selectedCategory!: { name: string };
  categories: { name: string }[] = [
    { name: 'Electronics' },
    { name: 'Television' },
    { name: 'Mobile Phones' },
  ];
  submitted: boolean = false;

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      serial: new FormControl('', [Validators.required]),
      batch: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('', [Validators.required]),
      manufacturedDate: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      availableColors: new FormControl(''),
      desc: new FormControl('', [Validators.required]),
      mainImage: new FormControl(''),
    });
  }

  get productFormControls() {
    return this.productForm;
  }

  onMultipleFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: 'info',
      detail: 'Product Images upload',
      summary: 'All product images will be uploaded on submit',
    });
  }

  onMainImageFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: 'info',
      detail: 'Product Images upload',
      summary: 'All product images will be uploaded on submit',
    });
  }

  productFormSubmit(): void {
    if (this.mainImageUpload._files.length < 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Main Product Image is required',
        detail: 'Main product image is required when creating a product',
      });
      return;
    }

    if (this.otherProductImagesUpload._files.length < 1) {
      this.messageService.add({
        severity: 'error',
        summary: 'Please upload another product image!',
        detail: 'Kindly ensure you provide any other related product image',
      });
      return;
    }

    console.log('Product Form ', this.productForm.value);

    let formData = new FormData();
    formData.append('file', this.mainImageUpload._files[0]);

    this.fileUplSvc.uploadImage(formData).subscribe({
      next: (res: any) => {
        const url = res.data;

        // add available colors
        // let availableColors = '';
        // this.productForm.value['availableColors'].forEach((element: string) => {
        //   availableColors += element + ', ';
        // });

        //
        let product = {
          ...this.productForm.value,
          availableColors: 'black, green',
          category: this.productForm.value['category'].name,
          mainImage: url,
        };

        this.saveProduct(product);
      },
      error: (err: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error occurred uploading product image!',
          detail: err.error.message,
        });
      },
    });
  }

  saveProduct(product: any): void {
    const manD = new Date(product.manufacturedDate);
    product = {
      ...product,
      manufacturedDate: `${manD.getMonth()}/${manD.getDate()}/${manD.getFullYear()}`,
    };
    // create the product
    this.productSvc.createProduct(product).subscribe({
      next: (res: any) => {
        console.log('after creating product', res);

        this.otherProductImagesUpload._files.forEach((f) => {
          let formData = new FormData();
          formData.append('file', f);
          // upload the product images
          this.uploadOtheProductImages(res.data[0].name, f.name, formData);
        });

        this.messageService.add({
          severity: 'success',
          summary: 'Product created successfully!',
          detail: res.message,
        });
      },
      error: (err) => {
        console.log('err', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error occurred creating product!',
          detail: err.error.message,
        });
      },
      // complete: () => {
      //   this.messageService.add({
      //     severity: 'success',
      //     summary: 'Product created successfully!',
      //     detail: 'Product and product images created successfully',
      //   });
      // },
    });
  }

  uploadOtheProductImages(productName: string, title: string, file: any): void {
    this.fileUplSvc.uploadImage(file).subscribe({
      next: (res: any) => {
        this.saveProductImage({
          productName,
          title,
          url: res.data,
          color: 'black',
        });
      },
      error: (err: any) => {
        console.log('error', err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error occurred uploading product image!',
          detail: err.error.message,
        });
      },
    });
  }

  saveProductImage(data: any): void {
    this.productSvc.addProductImage(data).subscribe({
      next: (res: any) => {
        console.log('product image res', res);
      },
      error: (err: any) => {
        console.log('error', err);

        this.messageService.add({
          severity: 'error',
          summary: 'Error occurred uploading product image!',
          detail: err.error.message,
        });
      },
    });
  }
}
