import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductOverviewComponent } from "./product-overview.component";
import { OverviewRoutingModule } from "./overview-routing.module";
import { ToastModule } from "primeng/toast";
import { DataViewModule } from "primeng/dataview";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { RatingModule } from "primeng/rating";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverviewRoutingModule,
    DropdownModule,
    InputTextModule,
    ToastModule,
    DataViewModule,
    ButtonModule,
    RatingModule,
    DynamicDialogModule,
  ],
  declarations: [ProductOverviewComponent],
})
export class ProductOverviewModule {}
