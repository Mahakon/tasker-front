import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Status, Task} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./styles/task.component.less']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  @Input() isEdit = false;

  @Output() closeAddedTask: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<Task> = new EventEmitter<Task>();
  constructor(
    private currentDashboardService: CurrentDashboardService
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
          status: this.task.status
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
          status: this.task.status
        }
      });
    } else {
      this.currentDashboardService.websocket.next({
        event: DashboardEvents.CHANGE_DISCRIPTION,
        task: {
          id: this.task.id,
          discription: this.task.discription,
          status: this.task.status
        }
      });
    }
    this.onClose();
  }

  onRedact() {
    this.edit.emit(this.task);
  }

}
