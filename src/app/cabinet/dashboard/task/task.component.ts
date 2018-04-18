import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Status, Task} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {UserService} from '../../../services/cabinet/user/user.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./styles/task.component.less']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  @Input() isEdit = false;

  @Output() closeAddedTask: EventEmitter<any> = new EventEmitter();

  constructor(
    private currentDashboardService: CurrentDashboardService,
    private User: UserService
  ) { }

  ngOnInit() {

  }

  onEdit() {
    this.isEdit = !this.isEdit;
    if (this.task.id === undefined) {
      this.onClose();
    }
  }

  onClose() {
    this.isEdit = !this.isEdit;
    this.closeAddedTask.emit(null);
  }

  onDelete() {
    if (this.task.id !== undefined) {
      console.log('deleting');
      this.currentDashboardService.websocket.next({
        event: DashboardEvents.DELETE,
        task: {
          id: this.task.id,
          discription: this.task.discription,
          status: this.task.status,
          userId: this.User.userId
        }
      });
    }
  }

  onAdd() {
    if (this.task.id === undefined) {
      this.currentDashboardService.websocket.next({
        event: DashboardEvents.ADD,
        task: {
          discription: this.task.discription,
          status: this.task.status,
          userId: this.User.userId
        }
      });
    } else {
      this.currentDashboardService.websocket.next({
        event: DashboardEvents.CHANGE_DISCRIPTION,
        task: {
          id: this.task.id,
          discription: this.task.discription,
          status: this.task.status,
          userId: this.User.userId
        }
      });
    }
    this.onClose();
  }

}
