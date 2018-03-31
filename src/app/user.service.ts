import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from './cabinet/user/user';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { host } from './config';
import { UserId } from './sign/sign-in/userId';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  private userUrl = host + 'user';
  private signInUrl = host + 'sign-in';

  getUserData(id: number): Observable<User> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUserLogin id=${id}`))
    );
  }

  isAuthUser(): Observable<UserId> {
    const url = this.signInUrl;
    return this.http.get<UserId>(url);
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
