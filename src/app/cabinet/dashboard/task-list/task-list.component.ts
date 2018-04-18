import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {Task} from '../../../services/cabinet/dashboard/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./styles/task-list.component.less']
})
export class TaskListComponent implements OnInit {

  @Input() status;
  @Input() taskList;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  /*just commet*/
  isAdd = false;
  constructor(
    private currentDashboardService: CurrentDashboardService
  ) { }

  ngOnInit() {
  }

  onAddNewTask() {
    this.isAdd = !this.isAdd;
  }

  changeTaskStatus(e: any) {
    e.dragData.status = this.status;
    const task = e.dragData;
    this.currentDashboardService.websocket.next({
      event: DashboardEvents.CHANGE_STATUS,
      task: task
    });
  }

  onEditTask(task) {
    this.editTask.emit(task);
  }

}
