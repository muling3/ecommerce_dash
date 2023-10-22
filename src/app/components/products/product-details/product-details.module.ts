import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { NewProductRoutingModule } from "../new-product/new-product-routing.module";
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import { FileUploadModule } from "primeng/fileupload";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { ProductDetailsComponent } from "./product-details";
import { ButtonModule } from "primeng/button";
import { RatingModule } from "primeng/rating";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NewProductRoutingModule,
    AutoCompleteModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputNumberModule,
    InputTextareaModule,
    InputTextModule,
    FileUploadModule,
    ToastModule,
    ProgressSpinnerModule,
    ButtonModule,
    RatingModule
  ],
  declarations: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
