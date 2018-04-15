import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserData, UserService} from '../services/cabinet/user/user.service';

@Injectable()
export class CabinetResolver implements Resolve<UserData> {

  constructor(private userService: UserService) {}

  resolve(): Observable<UserData> {
    return this.userService.getUserData(this.userService.userId);
  }
}
