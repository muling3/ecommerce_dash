import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ProductsListComponent } from "./products-list.component";
import { ListRoutingModule } from "./list-routing.module";

@NgModule({
  imports: [CommonModule, FormsModule, ListRoutingModule],
  declarations: [ProductsListComponent],
})
export class ProductListModule {}
