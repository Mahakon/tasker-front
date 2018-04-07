import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SignInService} from '../../services/sign-in.service';

@Injectable()
export class InGuard implements CanActivate {

  constructor(
    private router: Router,
    private signInService: SignInService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.isValidSession();
  }

  isValidSession() {
    return new Promise<boolean>((resolve, reject) => {
      this.signInService.isAuthUser()
        .subscribe(result => {
          console.log(result);
          if (result.id !== -1) {
            this.router.navigateByUrl('/cabinet');
          }

          resolve(true);
        });
    });
  }
}
