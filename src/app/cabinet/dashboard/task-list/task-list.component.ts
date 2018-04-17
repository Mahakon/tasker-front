import {Component, Input, OnInit} from '@angular/core';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./styles/task-list.component.less']
})
export class TaskListComponent implements OnInit {

  @Input() status;
  @Input() taskList;
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

}
