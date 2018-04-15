import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService} from '../../../services/cabinet/dashboard/current-dashboard.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./styles/task.component.less']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;

  isEdit = false;

  constructor(
    private currentDashboardService: CurrentDashboardService
  ) { }

  ngOnInit() {
  }

  onEdit() {
    this.isEdit = !this.isEdit;
  }

  onClose() {
    this.isEdit = !this.isEdit;
  }

  onDelete() {
    this.currentDashboardService.dashboardData[this.task.status] =
      this.currentDashboardService.dashboardData[this.task.status]
        .filter( curTask => {
          return this.task.id !== curTask.id;
        }
      );
  }

  onAdd() {
    this.currentDashboardService.dashboardData[this.task.status]
      .some( curTask => {
        if (curTask.id === this.task.id) {
          curTask.discription = this.task.discription;
          return true;
        }
        return false;
      });
    this.onClose();
  }

}
