import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private readonly URL = 'http://localhost:8080/';
  constructor(private http: HttpClient) {}

  uploadImage(fomData: any): Observable<any> {
    return this.http.post(this.URL + 'uploads/products', fomData);
  }
}
