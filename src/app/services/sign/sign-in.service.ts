import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {host, login, mode, password} from '../../config';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

export interface UserIdData {
  id: number;
}

export enum BotAnimation {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
  ANGRY = 'ANGRY',
  NORMAL = 'NORMAL'
}

@Injectable()
export class SignInService {

  constructor(private http: HttpClient) { }
  private signInUrl = host + `auth/sign-in/?mode=${mode}&login=${login}&password=${password}`;
  firstTime = true;
  private subject = new Subject<any>();

  isAuthUser(): Observable<UserIdData> {
    const url = this.signInUrl;
    const a = this.http.get<UserIdData>(url);
    console.log(a);
    return a;
  }

  sendAnimation(animation: BotAnimation) {
    this.subject.next(animation);
  }

  getAnimation(): Observable<any> {
    return this.subject.asObservable();
  }

  turnOffLoadingAnimation() {
    document.getElementById('loaderBot').style.display = 'none';
  }

  autherize(url: string, data: FormData): Observable<UserIdData> {
    return this.http.post<UserIdData>(url, data);
  }

  setSession(id): Observable<UserIdData> {
    const url = host + `session/set?id=${id}`;
    return this.http.get<UserIdData>(url);
  }
}
