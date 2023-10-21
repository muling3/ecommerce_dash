import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from "@angular/router";
import { inject } from "@angular/core";
import { AuthenticationService } from "../service/auth.service";

export const AuthGuard: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  return inject(AuthenticationService).canActivate(next, state);
};
