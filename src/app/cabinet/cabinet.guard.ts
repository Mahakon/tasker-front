import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {SignInService} from '../services/sign-in.service';
import {UserService} from '../services/user.service';

@Injectable()
export class CabinetGuard implements CanActivate {

  constructor(
    private router: Router,
    private signInService: SignInService,
    private userService: UserService
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
            this.userService.userId = result.id;
            resolve(true);
          } else {
            this.router.navigateByUrl('/auth/sign-in');
            resolve(false);
          }
        });
    });
  }
}
