import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {host} from '../config';
import {Observable} from 'rxjs/Observable';
import {UserIdData} from '../auth/in/UserIdData';

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) { }
  private signInUrl = host + 'auth/sign-in';

  isAuthUser(): Observable<UserIdData> {
    const url = this.signInUrl;
    return this.http.get<UserIdData>(url);
  }
}
