import {Component, OnDestroy, OnInit} from '@angular/core';
import {Status, Task} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {ActivatedRoute} from '@angular/router';
import {ISubscription} from 'rxjs/Subscription';
import {static_host} from '../../../config';

@Component({
  selector: 'app-current-dashboard',
  templateUrl: './current-dashboard.component.html',
  styleUrls: ['./styles/current-dashboard.component.less']
})

export class CurrentDashboardComponent implements OnInit, OnDestroy {
  private view = {
    showUrl: false,
    baseShareUrl: `${location.origin}`,
    shareUrl: '',
    show: true,
  };
  private members = [];
  statusList = [Status.Todo, Status.Process, Status.Done];
  private subscriptionToAddTask: ISubscription;
  private subscriptionToDeleteTask: ISubscription;
  private subscriptionToChangeTaskDiscription: ISubscription;
  private subscriptionToChangeTaskStatus: ISubscription;
  private subscriptionToChangeEvents: ISubscription;

  constructor(
    public currentDashboardService: CurrentDashboardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentDashboardService.getMembers().subscribe(value => {
      const members = value.members;
      this.members = members.map(v => {
          let name = '';
          if (v.userData[1]) {
            name += v.userData[1];
          }
          if (v.userData[2]) {
            name += ' ' + v.userData[2];
          }
          name += ' ' + '@' + v.userData[0];
          return {
            avatar: static_host + v.userData[3],
            name: name
          };
        }
      );
      console.log(this.members);
    });
    if (this.currentDashboardService.eventsData.length === 0) {
      this.currentDashboardService.getEvent().subscribe(a => a.forEach(i => this.addEvent(i)));
    }
    this.currentDashboardService.getShareLink().subscribe(result => {
      this.view.shareUrl = result.code;
    });
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

    this.subscriptionToChangeEvents = this.currentDashboardService.getSubscriptionToEvent(DashboardEvents.EVENTS)
      .subscribe(
        task => {
          this.addEvent(task);
        }
      );
  }

  refreshShareLink()  {
    this.currentDashboardService.refreshShareLink().subscribe(result => this.view.shareUrl = result.code);
  }

  ngOnDestroy() {

    this.subscriptionToAddTask.unsubscribe();
    this.subscriptionToDeleteTask.unsubscribe();
    this.subscriptionToChangeTaskDiscription.unsubscribe();
    this.subscriptionToChangeTaskStatus.unsubscribe();
    this.subscriptionToChangeEvents.unsubscribe();
  }

  addNewTask(task) {
  //  console.log('addNewTask', task);
    this.currentDashboardService.dashboardData[task.status].push(task);
  }

  deleteTask(task) {
    // console.log('delete');
    this.currentDashboardService.dashboardData[task.status] =
      this.currentDashboardService.dashboardData[task.status]
        .filter( curTask => {
            return task.id !== curTask.id;
          }
        );
  }

  changeDiscriptionTask(task) {
 //   console.log('change discription');
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

  addEvent(task) {
    this.currentDashboardService.eventsData.push({task: task});
  }
  toMenu() {
    this.view.show = !this.view.show;
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
