import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CurrentDashboardService} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {Status} from '../../../services/cabinet/dashboard/task.service';

@Injectable()
export class CurrentDashboardResolver implements Resolve<Status[]> {

  constructor(private currentDashboardService: CurrentDashboardService) {}

  resolve(): Observable<Status[]> {
    this.currentDashboardService.webSocketService.opening = false;
    this.currentDashboardService.webSocketService.close();
    return this.currentDashboardService
      .getTasks(this.currentDashboardService.currentProjectId);
  }
}
