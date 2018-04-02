import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';
import { host } from '../../config';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./styles/defaultIn.less']
})
export class InComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signInService: SignInService
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

  private goToUserPage(id) {
    this.router.navigate(
      ['/user/' + id.toString()],
      { relativeTo: this.route }
    );
  }

  isValidSession() {
    return new Promise((resolve, reject) => {
      this.signInService.isAuthUser()
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
    const url = host + 'auth/sign-in';
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

