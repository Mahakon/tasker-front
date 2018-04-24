import { Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {ProjectListService} from '../../../services/cabinet/projects/project-list.service';
import {CurrentDashboardService} from '../../../services/cabinet/dashboard/current-dashboard.service';


@Component({
    selector: 'app-button-menu-component',
    templateUrl: './button-menu.component.html',
    styleUrls: ['./button-menu.component.less']
})

export class ButtonMenuComponent implements OnInit {
  @Input() data: any;

  constructor(
    private projectListService: ProjectListService,
    private router: Router,
    private currentDashboardService: CurrentDashboardService
  ) {}

  ngOnInit() {
    if (this.data.title === 'DASHBOARD') {
      this.projectListService.getCurrentProject().subscribe(
        (id) => {
          new Promise((resolve, reject) => {
            this.projectListService.projectLoading =
              !this.projectListService.projectLoading;
            this.data.url = `/cabinet/dashboard/${id}`;
            this.currentDashboardService.currentProjectId = id;
            resolve(this.data.url);
          })
          .then(
            url => this.router.navigateByUrl(this.data.url)
          );
        });
    }
  }
}
