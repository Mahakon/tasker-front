import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { host } from '../../config';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./styles/default.less']
})
export class UpComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  private goToUserPage(id) {
    this.router.navigate(
      ['/user/' + id.toString()],
      { relativeTo: this.route }
    );
  }

  sendDataToServer() {
    const formEl = document.forms.namedItem('sign-up_form');
    const data = new FormData(formEl);
    const url = host + 'auth/sign-up';
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
