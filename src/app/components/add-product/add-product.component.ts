import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

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
  constructor(private messageService: MessageService) {}

  uploadedFiles: any[] = [];
  selectedCategory!: { name: string };
  categories: { name: string }[] = [
    { name: 'Electronics' },
    { name: 'Television' },
    { name: 'Mobile Phones' },
  ];

  onBasicUploadAuto(event: any) {
    console.log('file', event.files);
    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }

  onMultipleUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
}
