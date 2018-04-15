import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import { host } from '../../config';
import {UserService} from '../../services/cabinet/user/user.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./styles/default.less']
})
export class SignComponent implements OnInit {
  private vkClientId = 6435400;
  private bitbucketClientId = 'vcTtRQqP9hvuSx2P2h';
  isSignIn: boolean;
  vkUrl = `https://oauth.vk.com/authorize?` +
          `client_id=${this.vkClientId}&` +
          `display=page&` +
          `redirect_uri=${host}auth/vk&` +
          `scope=email&response_type=code&v=5.74`;
  bitbucketUrl = `https://bitbucket.org/site/oauth2/authorize?` +
                 `client_id=${this.bitbucketClientId}&` +
                 `response_type=code`;

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.turnOffLoadingAnimation();
    this.isSignIn = true;
    this.changeColorOfSelectedLink();
  }

  changeColorOfSelectedLink() {
    this.router.events
      .subscribe(
        event => {
          if (event instanceof NavigationEnd) {
            if (event.url === '/auth/sign-in') {
              this.isSignIn = true;
            } else {
              if (event.url === '/auth/sign-up') {
                this.isSignIn = false;
              }
            }
          }
        }
      );
  }
}
