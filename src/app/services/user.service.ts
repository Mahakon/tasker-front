import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from '../config';
import { Observable } from 'rxjs/Observable';

export interface UserData {
  login: string;
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  private userUrl = host + 'user/';
  userId: number;

  getUserData(id: number): Observable<UserData> {
    const url = `${this.userUrl + id}`;
    return this.http.get<UserData>(url);
  }

  logOut(): Observable<any> {
    const url = host + `session/delete`;
    return this.http.get<any>(url);
  }
}
