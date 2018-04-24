import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../services/sign/sign-in.service';
import { UserData, UserService } from '../services/cabinet/user/user.service';
import { host } from '../config';
import {ProjectListService} from '../services/cabinet/projects/project-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.less']
})
export class CabinetComponent implements OnInit, OnDestroy {
    public id: number;
    public host_name: string;
    public open_menu = false;
    public exit: any = {title: 'Выход', url: '/exit/', ico: '<i class="fas fa-sign-out-alt"></i>'};
    public currentPage = '';
    public user: any;
    subscription: Subscription;
    subscription_2: Subscription;
    menu: any = [
        {title: 'HOME', url: '/cabinet/projects/', ico: '<i class="fas fa-home"></i>'},
        {title: 'PROJECTS', url: '/cabinet/projects/', ico: '<i class="fas fa-briefcase"></i>'},
        {title: 'DASHBOARD', url: `/cabinet/dashboard/underfined`, ico: '<i class="fas fa-columns"></i>'},
        {title: 'USER', url: '/cabinet/user/', ico: '<i class="fas fa-user"></i>'}
      /*  {title: 'TITLE5', url: '/cabinet/stats/', ico: '<i class="fas fa-chart-pie"></i>'} */
    ];


  /*
  get user(): UserData {
    return this.userData;
  }
  */
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private projectListService: ProjectListService
      ) {}

    ngOnInit() {
      this.route.url.subscribe(a => {
        this.userService.updateCurrentPage('');
        if (this.route.firstChild) {
          const current = this.route.firstChild.url.subscribe(url => {
            // console.log(url[0].path);
            this.userService.updateCurrentPage(url[0].path);
          });
        }
      });
      this.user = this.route.snapshot.data.user;
      this.subscription_2 = this.userService.userUpdate.subscribe(user => {
        // console.log(user);
        this.user = user;
      });
      this.subscription = this.userService.currentPageUpdate.subscribe(page => {
        this.currentPage = page;
      });
      this.userService.turnOffLoadingAnimation();
      this.host_name = host;
      this.projectListService.listOfProjects = this.user.projects;
    }

    goToSignIn() {
      return this.router.navigateByUrl('/auth/sign-in');
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
      this.subscription_2.unsubscribe();
    }

    logOut() {
      this.userService.logOut()
        .subscribe(
          value => {
            console.log(value);
            this.userService.userId = undefined;
            this.goToSignIn()
              .then(
                suc => console.log(suc),
                err => console.log(err)
              );
          },
          err => console.log(err)
        );
    }

    click_on_menu() {
        this.open_menu = !this.open_menu;
    }
    hide_menu() {
      this.open_menu = false;
    }
}
