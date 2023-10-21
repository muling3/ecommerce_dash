import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { MessageService } from "primeng/api";
import { ToastCloseEvent } from "primeng/toast";
import { LayoutService } from "src/app/layout/service/app.layout.service";
import { AuthenticationService } from "src/app/service/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styles: [
    `
      :host ::ng-deep .pi-eye,
      :host ::ng-deep .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
        color: var(--primary-color) !important;
      }
    `,
  ],
})
export class LoginComponent {
  valCheck: string[] = ["remember"];

  password!: string;
  username!: string;

  constructor(
    public layoutService: LayoutService,
    private messageService: MessageService,
    private authSvc: AuthenticationService,
    private router: Router,
    private cookieSvc: CookieService
  ) {}

  loginFormSubmit(): void {
    if (!this.password || !this.username) {
      this.messageService.add({
        severity: "error",
        summary: "Error Authenticating Account",
        detail: "Kindly ensure username and password are provided",
      });
      return;
    }

    this.authSvc
      .authenticateAdmin({ username: this.username, password: this.password })
      .subscribe({
        next: (res: any) => {
          // save user cred to cookies
          this.cookieSvc.set(
            "admin-token",
            JSON.stringify({
              token: res.data,
              username: this.username,
            }),
            { secure: true }
          );

          this.messageService.add({
            severity: "success",
            summary: "Authentication Successful",
            detail: "Authenticated as " + this.username,
            life: 2000,
          });
        },
        error: (err: any) => {
          this.messageService.add({
            severity: "error",
            summary: "Error Authenticating Account",
            detail: err.error ? err.error.message : err.message,
          });
        },
      });
  }

  toastClose(event: ToastCloseEvent): void {
    // navigate to dashboard
    if (event.message.severity === "success") this.router.navigateByUrl("/");
  }
}
