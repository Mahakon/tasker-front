import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import { host } from '../../config';
import {Validators} from '@angular/forms';
import {UserService} from '../../services/cabinet/user/user.service';
import {BotAnimation, SignInService} from '../../services/sign/sign-in.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./styles/default.less']
})
export class SignComponent implements OnInit {
  private vkClientId = 6435400;
  private bitbucketClientId = 'HeXa6xKMQHt9DXd6bk';
  isSignIn: boolean;
  vkUrl = `https://oauth.vk.com/authorize?` +
          `client_id=${this.vkClientId}&` +
          `display=page&` +
          `redirect_uri=${host}auth/vk&` +
          `scope=email&response_type=code&v=5.74`;
  bitbucketUrl = `https://bitbucket.org/site/oauth2/authorize?` +
                 `client_id=${this.bitbucketClientId}&` +
                 `response_type=code`;
  botState = {
    angry: false,
    normal: false,
    antenns: true,
    pupil: true,
    open: false,
    close: false,
    loading: false
  };

  constructor(
    private router: Router,
    private userService: UserService,
    private signInService: SignInService
  ) {}

  ngOnInit() {
    this.userService.turnOffLoadingAnimation();
    this.isSignIn = true;
    this.changeColorOfSelectedLink();
    this.changeClassBot();
  }

  changeClassBot() {
    this.signInService.getAnimation()
      .subscribe(
        animation => {
          console.log(animation);
          switch (animation) {
            case BotAnimation.ANGRY: {
              this.botState.antenns = false;
              this.botState.pupil = false;
              this.botState.angry = true;
            } break;
            case BotAnimation.NORMAL: {
              this.botState.normal = true;
              this.botState.antenns = true;
              this.botState.pupil = true;
              this.botState.normal = false;
            }break;
          }
        }
      );
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
