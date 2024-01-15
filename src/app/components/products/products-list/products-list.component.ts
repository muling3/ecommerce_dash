import { Component, ElementRef, ViewChild } from "@angular/core";
import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { Product } from "src/app/api/product";
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: "app-products-list",
  templateUrl: "./products-list.component.html",
  styleUrls: ["./products-list.component.scss"],
})
export class ProductsListComponent {
  products: Product[] = [];

  loading: boolean = true;

  @ViewChild("filter") filter!: ElementRef;

  constructor(
    private productService: ProductService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (res: any) => {
        this.products = res.data;
        this.loading = false;
      },
      error: (err: any) => {
        console.log("err", err);
        this.loading = false;
        this.messageService.add({
          severity: "error",
          summary: "Error Fetching Products!",
          detail: err.error.message ? err.error.message : err.message,
        });
      },
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = "";
  }
}
