import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class ImageUploadService {
  constructor(private http: HttpClient) {}

  private readonly serverUrl = environment.serverUrl;

  uploadProductImage(data: FormData): Observable<any> {
    return this.http.post(
      this.serverUrl + environment.productImagesUploadUrl,
      data
    );
  }
}
