import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../services/sign/sign-in.service';
import { UserData, UserService } from '../services/cabinet/user/user.service';
import { host } from '../config';
import {ProjectListService} from '../services/cabinet/projects/project-list.service';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.component.less']
})
export class CabinetComponent implements OnInit {
    private id: number;
    private host_name: string;
    private open_menu = false;
    private exit: any = {title: 'Выход', url: '/exit/', ico: '<i class="fas fa-sign-out-alt"></i>'};
    public currentPage = '';
    menu: any = [
        {title: 'HOME', url: '/cabinet/projects/', ico: '<i class="fas fa-home"></i>'},
        {title: 'PROJECTS', url: '/cabinet/projects/', ico: '<i class="fas fa-briefcase"></i>'},
        {title: 'DASHBOARD', url: `/cabinet/dashboard/underfined`, ico: '<i class="fas fa-columns"></i>'},
        {title: 'USER', url: '/cabinet/user/', ico: '<i class="fas fa-user"></i>'},
        {title: 'TITLE5', url: '/cabinet/stats/', ico: '<i class="fas fa-chart-pie"></i>'}
    ];


  get user(): UserData {
    return this.route.snapshot.data.user;
  }

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        private projectListService: ProjectListService
      ) {}

    ngOnInit() {
      /*
        Проверяем рефералку 
      */
    if (localStorage.getItem('share_link') && localStorage.getItem('share_link_time')){
      const share_link = localStorage.getItem('share_link');
      const share_link_time = localStorage.getItem('share_link_time');
      const current_time = Date.now();
      if (current_time - parseInt(share_link_time) <= 60*5*1000) {
        // Тут отправляем запрос
        this.projectListService.addProjectToUser(share_link, this.userService.userId).subscribe(res => console.log(res));
      }else{
        console.log('Ссылка устарела');
      }
      localStorage.removeItem('share_link_time');
      localStorage.removeItem('share_link');
    }
    this.userService.turnOffLoadingAnimation();
    this.host_name = host;
    this.projectListService.listOfProjects = this.user.projects;
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
            this.userService.userId = undefined;
            this.goToSignIn();
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
