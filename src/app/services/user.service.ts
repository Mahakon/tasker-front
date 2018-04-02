import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from '../config';
import { Observable } from 'rxjs/Observable';
import { UserData } from '../cabinet/user/UserData';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  private userUrl = host + 'user';

  getUserData(id: number): Observable<UserData> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<UserData>(url);
  }
}
