import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./styles/default.less']
})
export class SignComponent implements OnInit {
  isSignIn: boolean;
  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.changeColorOfSelectedLink();
  }

  changeColorOfSelectedLink() {
    this.router.events
      .subscribe(
        event => {
          if (event instanceof NavigationEnd) {
            if (event.url === '/sign-in') {
              this.isSignIn = true;
            } else {
              if (event.url === '/sign-up') {
                this.isSignIn = false;
              }
            }
          }
        }
      );
  }
}
