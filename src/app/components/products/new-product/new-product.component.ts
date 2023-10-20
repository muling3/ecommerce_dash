import { Component, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { FileUpload, FileUploadHandlerEvent } from "primeng/fileupload";
import { CountryService } from "src/app/service/country.service";

@Component({
  selector: "app-new-product",
  templateUrl: "./new-product.component.html",
  styleUrls: ["./new-product.component.scss"],
})
export class NewProductComponent {
  brands: any[] = [];

  categories: any[];

  filteredBrands: any[] = [];

  productForm!: FormGroup;

  @ViewChild("mainProductImage") mainImageUpload!: FileUpload;
  @ViewChild("otherProductImages") otherProductImagesUpload!: FileUpload;

  constructor(
    private brandService: CountryService,
    private messageService: MessageService
  ) {
    this.categories = [
      { name: "Electronics", code: "EN" },
      { name: "Clothing", code: "CL" },
      { name: "Shoes", code: "SH" },
      { name: "Mobile Phone", code: "MP" },
      { name: "Accessories", code: "ACC" },
    ];
  }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      brand: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      serial: new FormControl("", [Validators.required]),
      batch: new FormControl("", [Validators.required]),
      quantity: new FormControl("", [Validators.required]),
      manufacturer: new FormControl("", [Validators.required]),
      manufacturedDate: new FormControl("", [Validators.required]),
      availableColors: new FormControl(""),
      desc: new FormControl("", [Validators.required]),
      mainImage: new FormControl(""),
    });

    this.brandService.getBrands().subscribe((res) => {
      this.brands = res.data;
    });
  }

  searchBrands(event: any) {
    const filtered: any[] = [];
    const query = event.query;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.brands.length; i++) {
      const brand = this.brands[i];
      if (brand.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(brand);
      }
    }

    this.filteredBrands = filtered;
  }

  onMultipleFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: "info",
      detail: "Product Images upload",
      summary: "All product images will be uploaded on submit",
    });
  }

  onMainImageFileUpload(event: FileUploadHandlerEvent) {
    this.messageService.add({
      severity: "info",
      detail: "Product Images upload",
      summary: "All product images will be uploaded on submit",
    });
  }

  productFormSubmit(): void {
    console.log("product form submit");
    this.messageService.add({
      severity: "info",
      detail: "Product Images upload",
      summary: "All product images will be uploaded on submit",
    });
  }
}
