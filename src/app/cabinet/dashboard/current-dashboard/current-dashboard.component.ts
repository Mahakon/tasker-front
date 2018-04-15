import { Component, OnInit } from '@angular/core';
import {Status} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./styles/current-dashboard.component.less']
})
export class CurrentDashboardComponent implements OnInit {

  statusList = [Status.Todo, Status.Process, Status.Done];
  constructor(
    public currentDashboardService: CurrentDashboardService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.currentDashboardService.dashboardData[Status.Todo] =
      this.route.snapshot.data.tasks.filter( curTask => {
        if (curTask.status === Status.Todo) {
          return true;
        }

        return false;
      });

    this.currentDashboardService.dashboardData[Status.Process] =
      this.route.snapshot.data.tasks.filter( curTask => {
        if (curTask.status === Status.Process) {
          return true;
        }

        return false;
      });

    this.currentDashboardService.dashboardData[Status.Done] =
      this.route.snapshot.data.tasks.filter( curTask => {
        if (curTask.status === Status.Done) {
          return true;
        }

        return false;
      });
  }

}
