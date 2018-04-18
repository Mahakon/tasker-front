import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { host } from '../../../config';
import { Observable } from 'rxjs/Observable';
import {Project} from '../projects/project.service';

export interface UserData {
  login: string;
  projects?: Project[];
  name: string;
  surname: string;
  avatar?: string;
}

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              ) { }
  userId: number;

  getUserData(id: number): Observable<UserData> {
    const url = host + `user/data?id=${id}`;
    return this.http.get<UserData>(url);
  }

  turnOffLoadingAnimation() {
    document.getElementById('loaderBot').style.display = 'none';
  }

  checkEmailOrLoginService(name, value): Observable<any> {
    const url = host + `user/data/check/`; // http://localhost:3000/api/user/data/check/?name=email&value=mah
    return this.http
      .post<any>(url, {name: name, value: value});
  }

  /* Удаляем аватарку */
  delAvatar(): Observable<any> {
    const url = host + `user/${this.userId}/delAvatar/`;
    return this.http
      .delete<any>(url);
  }
  /* Отправляем аватарку */
  postAvatar(fileToUpload: File): Observable<any> {
    const url = host + `user/${this.userId}/updateAvatar/`;
    const formData: FormData = new FormData();
    formData.append('avatar', fileToUpload, fileToUpload.name);
    return this.http
      .post<any>(url, formData);
  }
  /* Отправляем запрос на изменение пароля */
  postPasswordData(data: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('old_password', data.old_password);
    formData.append('password', data.password);
    const url = host + `user/${this.userId}/updatePassword/`;
    return this.http.post<any>(url, formData);
  }

  postUserData(user: any): Observable<any>  {
    const formData: FormData = new FormData();
    formData.append('name', user.name);
    formData.append('login', user.login);
    formData.append('surname', user.surname);
    const url = host + `user/${this.userId}/update/`;
    return this.http.post<any>(url, formData);
  }

  logOut(): Observable<any> {
    const url = host + `session/delete`;
    return this.http.get<any>(url);
  }
}
