import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductsListComponent } from "./products-list.component";
import { ListRoutingModule } from "./list-routing.module";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { RatingModule } from "primeng/rating";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    RatingModule,
    ToastModule,
    ListRoutingModule,
  ],
  declarations: [ProductsListComponent],
})
export class ProductListModule {}
