import { Component } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { DataView } from "primeng/dataview";
import { Product } from "src/app/api/product";
import { ProductService } from "src/app/service/product.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProductDetailsComponent } from "../product-details/product-details";

@Component({
  selector: "app-new-product",
  templateUrl: "./product-overview.component.html",
})
export class ProductOverviewComponent {
  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = "";

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    public dialogService: DialogService
  ) {}

  ref: DynamicDialogRef | undefined;

  ngOnInit() {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
      },
      error: (err: any) => {
        console.log("err", err);
        this.messageService.add({
          severity: "error",
          summary: "Error Fetching Products!",
          detail: err.error.message ? err.error.message : err.message,
        });
      },
    });

    this.sortOptions = [
      { label: "Price High to Low", value: "!price" },
      { label: "Price Low to High", value: "price" },
    ];
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf("!") === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }

  editProduct(product: any): void {
    this.ref = this.dialogService.open(ProductDetailsComponent, {
      header: "Product Details",
      width: "70%",
      contentStyle: { overflow: "auto" },
      baseZIndex: 10000,
      maximizable: true,
      data: product,
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
