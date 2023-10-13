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

  addProductImage(name: string, formData: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(
      this.URL + 'products/addImage?name=' + name,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  }
}
