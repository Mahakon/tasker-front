import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from '../../../config';
import { Observable } from 'rxjs/Observable';
import {Project} from '../projects/project.service';

export interface UserData {
  login: string;
  projects: Project[];
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  userId: number;

  getUserData(id: number): Observable<UserData> {
    const url = host + `user/data?id=${id}`;
    return this.http.get<UserData>(url);
  }

  turnOffLoadingAnimation() {
    document.getElementById('loaderBot').style.display = 'none';
  }

  logOut(): Observable<any> {
    const url = host + `session/delete`;
    return this.http.get<any>(url);
  }
}
