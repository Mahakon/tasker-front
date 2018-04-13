import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../../services/sign-in.service';
import { host } from '../../config';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./styles/defaultIn.less']
})
export class InComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signInService: SignInService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  private goToUserPage() {
    this.router.navigate(
      ['/cabinet'],
      { relativeTo: this.route }
    );
  }
  public login = '';

  private createForm() {
    return this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  sendDataToServer() {
    const formEl = document.forms.namedItem('sign-in_form');
    const data = new FormData(formEl);
    const url = host + 'auth/sign-in';

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
      });
  }
}

