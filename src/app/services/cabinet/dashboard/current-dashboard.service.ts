import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Status} from './task.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserData} from '../user/user.service';
import {host} from '../../../config';

@Injectable()
export class CurrentDashboardService {
  currentProjectId: number;
  dashboardData: object;
  constructor(
    private http: HttpClient
  ) {
   this.dashboardData = {
     'todo': [
       {id: 1, discription: 'maha', status: Status.Todo},
       {id: 2, discription: 'maha2', status: Status.Todo},
       ],
     'process': [],
     'done': []
   };
  }

  getTasks(id): Observable<Status[]> {
    const url = host + `cabinet/dashboard/get?id=${id}`;
    return this.http.get<Status[]>(url);
  }
}
