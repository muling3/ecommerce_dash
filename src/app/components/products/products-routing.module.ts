import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: "",
        loadChildren: () =>
          import("./products-list/list.module").then(
            (m) => m.ProductListModule
          ),
      },
      {
        path: "overview",
        loadChildren: () =>
          import("./products-overview/overview.module").then(
            (m) => m.ProductOverviewModule
          ),
      },
      {
        path: "new",
        loadChildren: () =>
          import("./new-product/new-product.module").then(
            (m) => m.NewProductModule
          ),
      },
      { path: "**", redirectTo: "/notfound" },
    ]),
  ],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
