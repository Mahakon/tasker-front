import { Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Status} from './task.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserData, UserService} from '../user/user.service';
import {host, wsshost} from '../../../config';
import {WebSocetService} from './websocet.service';
import 'rxjs/add/operator/map';
import {fromEvent} from 'rxjs/observable/fromEvent';
import {EventEmitter} from 'events';

export enum DashboardEvents {
  ADD = 'ADD',
  DELETE = 'DELETE',
  CHANGE_DISCRIPTION = 'CHANGE_DISCRIPTION',
  CHANGE_STATUS = 'CHANGE_STATUS',
  ADD_COMMENT = 'ADD_COMMENT',
  EVENTS = 'EVENTS'
}

@Injectable()
export class CurrentDashboardService {
  currentProjectId: number;
  dashboardData: object;
  websocket: Subject<any>;
  eventEmitter = new EventEmitter();
  eventsData: object[];
  constructor(
    private http: HttpClient,
    public webSocketService: WebSocetService,
    private userService: UserService
  ) {
   this.dashboardData = {
     'todo': [],
     'process': [],
     'done': []
   };
   this.eventsData = [];
  }

  openConnection() {
    const url = wsshost + `/api/cabinet/dashboard/connection/${this.currentProjectId}`;

    this.websocket = <Subject<any>>this.webSocketService
      .connect(url)
      .map((response: MessageEvent): any => {
        const data = JSON.parse(response.data);
        return data;
      });
  }



  createEvents() {
    this.websocket.subscribe(
      data => {
      //  console.log('data', data);
        this.eventEmitter.emit(DashboardEvents.EVENTS, data.event);

        if (data[DashboardEvents.ADD] !== undefined) {
          console.log('emit' + DashboardEvents.ADD);
          this.eventEmitter.emit(DashboardEvents.ADD,
            data[DashboardEvents.ADD]);
        }
        if (data[DashboardEvents.DELETE] !== undefined) {
          console.log('emit' + DashboardEvents.DELETE);
          this.eventEmitter.emit(DashboardEvents.DELETE,
            data[DashboardEvents.DELETE]);
        }

        if (data[DashboardEvents.CHANGE_DISCRIPTION] !== undefined) {
          console.log('emit' + DashboardEvents.CHANGE_DISCRIPTION);
          this.eventEmitter.emit(DashboardEvents.CHANGE_DISCRIPTION,
            data[DashboardEvents.CHANGE_DISCRIPTION]);
        }

        if (data[DashboardEvents.CHANGE_STATUS] !== undefined) {
          console.log('emit' + DashboardEvents.CHANGE_STATUS);
          this.eventEmitter.emit(DashboardEvents.CHANGE_STATUS,
            data[DashboardEvents.CHANGE_STATUS]);
        }

        if (data[DashboardEvents.ADD_COMMENT] !== undefined) {
          console.log('emit' + DashboardEvents.ADD_COMMENT);
          this.eventEmitter.emit(DashboardEvents.ADD_COMMENT,
            data[DashboardEvents.ADD_COMMENT]);
        }
      },
      err => {
          console.log(err);
        },
      () => {
        if (this.webSocketService.opening) {
          this.openConnection();
          this.createEvents();
        }
      }
    );
  }

  getSubscriptionToEvent(event: DashboardEvents) {
    return fromEvent(this.eventEmitter, event);
  }

  getTasks(id): Observable<Status[]> {
    const url = host + `cabinet/dashboard/get?` +
                  `id=${id}&userId=${this.userService.userId}`;
    return this.http.get<Status[]>(url);
  }

  getEvent(): Observable<Status[]> {;
    const url = host + `cabinet/dashboard/getEvent?id=${this.currentProjectId}`;
    const res = this.http.get<Status[]>(url);
    return res;
  }

  /* Методы для шаринга */
  refreshShareLink(): Observable<any> {
    const url = host + `cabinet/dashboard/share/update?project_id=${this.currentProjectId}`;
    return this.http.get<any>(url);
  }

  getShareLink(): Observable<any> {
    const url = host + `cabinet/dashboard/share/get?project_id=${this.currentProjectId}`;
    return this.http.get<any>(url);
  }

  /* Методы мемберов */
  getMembers(): Observable<any> {
    console.log('gehgzc');
    const url = host + `cabinet/dashboard/members/get?project_id=${this.currentProjectId}`;
    return this.http.get<any>(url);
  }
}
