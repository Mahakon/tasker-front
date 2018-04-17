import {Component, OnDestroy, OnInit} from '@angular/core';
import {Status, Task} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {ActivatedRoute} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./styles/current-dashboard.component.less']
})
export class CurrentDashboardComponent implements OnInit, OnDestroy {

  statusList = [Status.Todo, Status.Process, Status.Done];
  private subscriptionToAddTask: ISubscription;
  private subscriptionToDeleteTask: ISubscription;
  private subscriptionToChangeTaskDiscription: ISubscription;
  private subscriptionToChangeTaskStatus: ISubscription;

  constructor(
    public currentDashboardService: CurrentDashboardService,
    private route: ActivatedRoute
  ) {}

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

    this.currentDashboardService.openConnection();
    this.currentDashboardService.webSocketService.opening = true;
    this.currentDashboardService.createEvents();

    this.subscriptionToAddTask = this.currentDashboardService.getSubscriptionToEvent(DashboardEvents.ADD)
      .subscribe(
        task => {
          this.addNewTask(task);
        }
      );

    this.subscriptionToDeleteTask = this.currentDashboardService.getSubscriptionToEvent(DashboardEvents.DELETE)
      .subscribe(
        task => {
          this.deleteTask(task);
        }
      );

    this.subscriptionToChangeTaskDiscription = this.currentDashboardService.getSubscriptionToEvent(DashboardEvents.CHANGE_DISCRIPTION)
      .subscribe(
        task => {
          this.changeDiscriptionTask(task);
        }
      );

    this.subscriptionToChangeTaskStatus = this.currentDashboardService.getSubscriptionToEvent(DashboardEvents.CHANGE_STATUS)
      .subscribe(
        task => {
          this.changeStatusTask(task);
        }
      );
  }

  ngOnDestroy() {
    this.subscriptionToAddTask.unsubscribe();
    this.subscriptionToDeleteTask.unsubscribe();
    this.subscriptionToChangeTaskDiscription.unsubscribe();
    this.subscriptionToChangeTaskStatus.unsubscribe();
  }

  addNewTask(task) {
    console.log(task);
    this.currentDashboardService.dashboardData[task.status].push(task);
  }

  deleteTask(task) {
    console.log('delete');
    this.currentDashboardService.dashboardData[task.status] =
      this.currentDashboardService.dashboardData[task.status]
        .filter( curTask => {
            return task.id !== curTask.id;
          }
        );
  }

  changeDiscriptionTask(task) {
    console.log('change discription');
      this.currentDashboardService.dashboardData[task.status]
        .some( curTask => {
            if (task.id === curTask.id) {
              curTask.discription = task.discription;
              return true;
            }
            return false;
          }
        );
  }

  changeStatusTask(task) {
    this.currentDashboardService.dashboardData[Status.Done] =
      this.currentDashboardService.dashboardData[Status.Done]
        .filter( curTask => {
            return task.id !== curTask.id;
          }
        );
    this.currentDashboardService.dashboardData[Status.Todo] =
      this.currentDashboardService.dashboardData[Status.Todo]
        .filter( curTask => {
            return task.id !== curTask.id;
          }
        );
    this.currentDashboardService.dashboardData[Status.Process] =
      this.currentDashboardService.dashboardData[Status.Process]
        .filter( curTask => {
            return task.id !== curTask.id;
          }
        );
    this.currentDashboardService.dashboardData[task.status].push(task);
  }
}
