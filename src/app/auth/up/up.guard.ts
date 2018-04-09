import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {SignInService} from '../../services/sign-in.service';
import {UserService} from '../../services/user.service';

@Injectable()
export class UpGuard implements CanActivate {

  constructor(
    private router: Router,
    private signInService: SignInService,
    private userService: UserService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.userService.userId !== undefined) {
      return true;
    }

    if (this.signInService.firstTime) {
      return this.isValidSession();
    }

    return true;
  }

  isValidSession() {
    return new Promise<boolean>((resolve, reject) => {
      this.signInService.isAuthUser()
        .subscribe(result => {
          console.log(result);
          this.signInService.firstTime = false;

          if (result.id !== -1) {
            this.userService.userId = result.id;
            this.signInService.firstTime = true;
            this.router.navigateByUrl('/cabinet');
          }

          resolve(true);
        });
    });
  }
}
