import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';
import { host } from '../../config';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./styles/default.less']
})
export class SignComponent implements OnInit {
  private vkClientId = 6435400;
  isSignIn: boolean;
  vkUrl = `https://oauth.vk.com/authorize?` +
          `client_id=${this.vkClientId}&` +
          `display=page&` +
          `redirect_uri=${host}auth/vk&` +
          `scope=email&response_type=code&v=5.74`;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
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
