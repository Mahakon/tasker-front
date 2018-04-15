import { Injectable } from '@angular/core';

export enum Status {
  Todo = 'todo',
  Process = 'process',
  Done = 'done'
}

export interface Task {
  id: number;
  discription: string;
  status: Status;
}

@Injectable()
export class TaskService {

  constructor() { }

}
