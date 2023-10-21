import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthRequest } from "../models/auth";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable, switchMap } from "rxjs";
import { AppResponse } from "../models/app.response";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  constructor(private router: Router, private http: HttpClient, private cookieSvc: CookieService) {}

  private readonly serverUrl = environment.serverUrl;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    //get user from cooki
    if (this.cookieSvc.check("admin-token")) return true;

    // redirect to auth page
    this.router.navigate(["auth/login"], {
      queryParams: { next: next.url.join("/") },
    });

    return false;
  }

  authenticateAdmin(data: AuthRequest): Observable<AppResponse> {
    return this.http.post<AppResponse>(
      this.serverUrl + environment.authUrl,
      data
    );
  }
}
