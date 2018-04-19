import {Component, Input, OnInit} from '@angular/core';
import {static_host} from '../../../../config';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.less']
})
export class EventComponent implements OnInit {
  @Input() event: any;
  login: string;
  task: string;
  board: string;
  avatar: string;
  constructor() {

  }

  ngOnInit() {
    console.log('EventComponent', this.event);
    if (this.event.task) {
      this.login = this.event.task.userData[0];
      this.task = this.event.task.discription;
      this.board = this.event.task.status;
      this.avatar = `${static_host}${this.event.task.userData[3]}`;
    }
  }

  get action() {
    let a = ''
    console.log(this.event);
    if (this.event.task) {
      switch (this.event.task.action) {
        case 'DELETE':
          a = 'удалил';
          break;
        case 'ADD':
          a = 'добавил';
          break;
        case 'CHANGE_DISCRIPTION':
          a = 'изменил описание';
          break;
        case 'CHANGE_STATUS':
          a = 'переместил';
          break;
        default:
          a = 'неизвестное действие';
      }
    }
    return a;
  }

}
