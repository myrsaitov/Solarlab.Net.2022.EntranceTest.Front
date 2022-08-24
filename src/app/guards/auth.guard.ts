import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.
})

export class AuthGuard implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //debugger;
    return this.auth.isAuthenticated()
      .then((isAuth: boolean) => {
        if (isAuth) {
          return true;
        } else {
          this.router.navigate(['/login'], {
            queryParams: {
              auth: false
            }
          });
        }
      });
  }
}
