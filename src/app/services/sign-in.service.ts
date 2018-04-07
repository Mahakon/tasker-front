import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {host, mode} from '../config';
import {Observable} from 'rxjs/Observable';

export interface UserIdData {
  id: number;
}

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) { }
  private signInUrl = host + `auth/sign-in?mode=${mode}&login=maha&password=maha`;

  isAuthUser(): Observable<UserIdData> {
    const url = this.signInUrl;
    return this.http.get<UserIdData>(url);
  }

  autherize(url: string, data: FormData): Observable<UserIdData> {
    return this.http.post<UserIdData>(url, data);
  }

  setSession(id): Observable<UserIdData> {
    const url = host + `session/set?id=${id}`;
    return this.http.get<UserIdData>(url);
  }
}
