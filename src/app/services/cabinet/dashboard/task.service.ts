import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {host} from '../../../config';

export enum Status {
  Todo = 'todo',
  Process = 'process',
  Done = 'done'
}

export interface TaskComment {
  id: number;
  task_id: number;
  user_id: number;
  content: string;
}

export interface Task {
  id: number;
  discription: string;
  status: Status;
}

/* jfdsl */
@Injectable()
export class TaskService {

  constructor(
    private http: HttpClient
  ) { }

  getComments(task: Task): Observable<TaskComment[]> {
    console.log(task.id);
    const url = host + `cabinet/dashboard/getTaskComments?id=${task.id}`;

    return this.http.get<TaskComment[]>(url);
  }

}
