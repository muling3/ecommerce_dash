import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ProductOverviewComponent } from "./product-overview.component";
import { OverviewRoutingModule } from "./overview-routing.module";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OverviewRoutingModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
  ],
  declarations: [ProductOverviewComponent],
})
export class ProductOverviewModule {}
