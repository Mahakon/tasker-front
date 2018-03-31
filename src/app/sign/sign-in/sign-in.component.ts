import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { host } from '../../config';
import { UserService } from '../../user.service';
import {promise} from 'selenium-webdriver';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./styles/default.less']
})
export class SignInComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.isValidSession()
      .then(
        id => {
          this.goToUserPage(id);
        },
        err => {
          console.log(err);
        }
      );
  }

  goToUserPage(id) {
    this.router.navigate(
      ['/user/' + id.toString()],
      { relativeTo: this.route }
    );
  }

  isValidSession() {
    return new Promise((resolve, reject) => {
      this.userService.isAuthUser()
        .subscribe(result => {
          if (result !== null) {
            resolve(result.id);
          }
          reject(new Error('not authed user'));
        });
    });
  }

  sendDataToServer() {
    const formEl = document.forms.namedItem('sign-in_form');
    const data = new FormData(formEl);
    const url = host + 'sign-in';
    const options = {
      method: 'POST',
      body: data
    };
    fetch(url, options)
      .then(
        res => res.json(),
        err => err
      )
      .then(
        body => {
          console.log(body.id);
          this.goToUserPage(body.id);
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
