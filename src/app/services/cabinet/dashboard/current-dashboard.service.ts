import { Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Status} from './task.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {UserData} from '../user/user.service';
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
    public webSocketService: WebSocetService
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
          this.eventEmitter.emit(DashboardEvents.ADD, data[DashboardEvents.ADD]);
        }
        if (data[DashboardEvents.DELETE] !== undefined) {
          console.log('emit' + DashboardEvents.DELETE);
          this.eventEmitter.emit(DashboardEvents.DELETE, data[DashboardEvents.DELETE]);
        }

        if (data[DashboardEvents.CHANGE_DISCRIPTION] !== undefined) {
          console.log('emit' + DashboardEvents.CHANGE_DISCRIPTION);
          this.eventEmitter.emit(DashboardEvents.CHANGE_DISCRIPTION, data[DashboardEvents.CHANGE_DISCRIPTION]);
        }

        if (data[DashboardEvents.CHANGE_STATUS] !== undefined) {
          console.log('emit' + DashboardEvents.CHANGE_STATUS);
          this.eventEmitter.emit(DashboardEvents.CHANGE_STATUS, data[DashboardEvents.CHANGE_STATUS]);
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
    const url = host + `cabinet/dashboard/get?id=${id}`;
    return this.http.get<Status[]>(url);
  }

  getEvent(): Observable<Status[]> {;
    const url = host + `cabinet/dashboard/getEvent?id=${this.currentProjectId}`;
    const res = this.http.get<Status[]>(url);
    return res;
  }
}
