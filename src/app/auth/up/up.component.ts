import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { host } from '../../config';
import {SignInService} from '../../services/sign-in.service';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./styles/default.less']
})
export class UpComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signInService: SignInService
  ) { }

  ngOnInit() {
  }

  private goToUserPage() {
    this.router.navigate(
      ['/cabinet'],
      { relativeTo: this.route }
    );
  }

  sendDataToServer() {
    const formEl = document.forms.namedItem('sign-up_form');
    const data = new FormData(formEl);
    const url = host + 'auth/sign-up';

    this.signInService.autherize(url, data)
      .subscribe(
        body => {
          console.log(body.id);
          this.signInService.setSession(body.id)
            .subscribe(
              value => {
              console.log(value);
              this.goToUserPage();
              },
              err => {
                console.log(err);
              }
            );
        },
        err => console.log(err)
      );

    Array.prototype.forEach.call(
      document.getElementsByClassName('__sign'),
      (el) => {
        el.value = '';
      }
    );
  }
}
