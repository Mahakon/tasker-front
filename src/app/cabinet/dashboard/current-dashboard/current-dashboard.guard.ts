import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {CurrentDashboardService} from '../../../services/cabinet/dashboard/current-dashboard.service';

@Injectable()
export class CurrentDashboardGuard implements CanActivate {

  constructor(
    private router: Router,
    private currentDashboardService: CurrentDashboardService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.currentDashboardService.currentProjectId === undefined) {
      this.router.navigateByUrl('/cabinet/projects');
    }
    return true;
  }
}
