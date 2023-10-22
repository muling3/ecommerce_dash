import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../api/product";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  private readonly serverUrl = environment.serverUrl;

  getProductsSmall() {
    return this.http
      .get<any>("assets/demo/data/products-small.json")
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }

  getProducts() {
    return this.http
      .get<any>("assets/demo/data/products.json")
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }

  getAllProducts(): Observable<any> {
    return this.http.get(this.serverUrl + environment.getProductsUrl);
  }

  getProductsMixed() {
    return this.http
      .get<any>("assets/demo/data/products-mixed.json")
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }

  getProductsWithOrdersSmall() {
    return this.http
      .get<any>("assets/demo/data/products-orders-small.json")
      .toPromise()
      .then((res) => res.data as Product[])
      .then((data) => data);
  }

  createProduct(product: any): Observable<any> {
    return this.http.post(
      this.serverUrl + environment.createProductUrl,
      product
    );
  }

  updateProduct(name: string, product: any): Observable<any> {
    return this.http.patch(
      this.serverUrl + environment.updateProductUrl,
      product,
      { params: { name } }
    );
  }

  addProductImage(data: any): Observable<any> {
    return this.http.post(this.serverUrl + environment.addProdImageUrl, data);
  }
}
