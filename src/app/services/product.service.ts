import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly URL = 'http://localhost:8080/api/';
  constructor(private http: HttpClient) {}

  createProduct(product: any): Observable<any> {
    return this.http.post(this.URL + 'products/new', product);
  }

  addProductImage(data: any): Observable<any> {
    return this.http.post(
      this.URL + 'products/addImage',
      data
    );
  }
}
