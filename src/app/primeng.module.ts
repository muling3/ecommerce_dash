import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { DropdownModule } from 'primeng/dropdown';
import { ImageModule } from 'primeng/image';

@NgModule({
  declarations: [],
  imports: [CalendarModule],
  exports: [
    ButtonModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    CalendarModule,
    FileUploadModule,
    ToastModule,
    ChipsModule,
    DropdownModule,
    ImageModule,
  ],
})
export class PrimengModule {}
