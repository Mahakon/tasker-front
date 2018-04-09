import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../services/sign-in.service';
import {UserData, UserService} from '../services/user.service';
import { host } from '../config';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.less']
})
export class CabinetComponent implements OnInit {
    private id: number;
    private open_menu = false;
    private exit: any = {title: 'Выход', url: '/exit/', ico: '<i class="fas fa-sign-out-alt"></i>'};
    private menu: any = [
        {title: 'TITLE1', url: '/cabinet/home/', ico: '<i class="fas fa-home"></i>'},
        {title: 'TITLE2', url: '/cabinet/work/', ico: '<i class="fas fa-briefcase"></i>'},
        {title: 'TITLE3', url: '/cabinet/dashboard/', ico: '<i class="fas fa-columns"></i>'},
        {title: 'TITLE4', url: '/cabinet/user/', ico: '<i class="fas fa-user"></i>'},
        {title: 'TITLE5', url: '/cabinet/stats/', ico: '<i class="fas fa-chart-pie"></i>'}
    ];

  get user(): UserData {
    return this.route.snapshot.data.user;
  }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService
      ) {}
    ngOnInit() {
    this.userService.turnOffLoadingAnimation();
    }

    goToSignIn() {
        this.router.navigate(
          ['/auth/sign-in'],
          { relativeTo: this.route }
        );
    }

    logOut() {
      this.userService.logOut()
        .subscribe(
          value => {
            console.log(value);
            this.goToSignIn();
          },
          err => console.log(err)
        );
    }

    click_on_menu() {
        this.open_menu = !this.open_menu;
        console.log('click');
    }
}
