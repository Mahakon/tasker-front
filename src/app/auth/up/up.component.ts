import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { host } from '../../config';
import {BotAnimation, SignInService} from '../../services/sign/sign-in.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../components/validators';
import { UserService} from '../../services/cabinet/user/user.service';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./styles/default.less']
})
export class UpComponent implements OnInit {
  form: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private signInService: SignInService,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  private checkLoginService(control: AbstractControl) {
    return new Promise(resolve => {
      this.userService.checkEmailOrLoginService('login', control.value)
        .debounceTime(500)
        .subscribe(a => {
          if (a.result) {
            this.signInService.sendAnimation(BotAnimation.ANGRY);
            resolve({isUsed: 'Логин занят'});
          }
          this.signInService.sendAnimation(BotAnimation.NORMAL);
          resolve(null);
      });
    });
  }

  private checkEmailService(control: AbstractControl) {
    return new Promise(resolve => {
      this.userService.checkEmailOrLoginService('email', control.value).subscribe(a => {
        if (a.result) {
          this.signInService.sendAnimation(BotAnimation.ANGRY);
          resolve({isUsed: 'Email занят'});
        }
        this.signInService.sendAnimation(BotAnimation.NORMAL);
        resolve(null);
      });
    });
  }

  private createForm() {
    return this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)], [
        this.checkLoginService.bind(this)
      ]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.email], [this.checkEmailService.bind(this)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6), CustomValidators.checkEquallyStringReverse]]
    });
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
