import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/services/product.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
  constructor(
    private messageService: MessageService,
    private productSvc: ProductService
  ) {}

  productForm!: FormGroup;

  uploadedFiles: any[] = [];
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
      manufacturerDate: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      availableColors: new FormControl('', [Validators.required]),
      desc: new FormControl('', [Validators.required]),
      mainImage: new FormControl('', [Validators.required]),
      otherImages: new FormControl('', [Validators.required]),
    });
  }

  get productFormControls() {
    return this.productForm;
  }

  onMultipleUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  onImageSelect(event: any): void {
    console.log('selected event image', event.files[0]);
  }

  productFormSubmit(): void {
    console.log('Product Form ', this.productForm.valid);
    let formData = new FormData();
    formData.append('file', this.uploadedFiles[0]);
    // this.productSvc
    //   .addProductImage('Samsung S23', this.uploadedFiles[0])
    //   .subscribe({
    //     next: (res: any) => {
    //       console.log('response', res);
    //     },
    //     error: (error) => {
    //       console.log('error', error);
    //     },
    //   });
  }
}
