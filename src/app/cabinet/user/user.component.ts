import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData, UserService } from '../../services/cabinet/user/user.service';
import { host } from '../../config';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CustomValidators } from '../../components/validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  users_data: FormGroup;
  password_form: FormGroup;
  avatar_src = '';
  host = host;
  private updated = {
    users_data: false,
    password_form: false
  };
  public avatar: File = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private FB: FormBuilder
  ) {
  }

  private handleFileInput(files: FileList) {
    this.avatar = files.item(0);
    this.uploadFileToActivity();
  }
  private removeAvatar() {
    console.log('Тут я удаляю аватарку');
    this.userService.delAvatar().subscribe(data => {
      // do something, if upload success
      console.log(data);
      this.avatar_src = data.src;

    }, error => {
      console.error('delAvatar', error);
    });
  }
  uploadFileToActivity() {
    this.userService.postAvatar(this.avatar).subscribe(data => {
      // do something, if upload success
      console.log(data);
      this.avatar_src = data.src;
    }, error => {
      console.error('uploadFileToActivity', error);
    });
  }

  get user(): UserData {
    const user = {};
    // user.avatar = host + '../' + user.avatar;
    return Object.assign(user, this.route.parent.snapshot.data.user);
  }
  private checkLoginService(control: AbstractControl) {
    return new Promise(resolve => {
      this.userService.checkEmailOrLoginService('login', control.value).subscribe(a => {
        console.log(control);
        if (a.result && control.value !== this.user.login) {
          resolve({isUsed: 'Логин занят'});
        }
        resolve(null);
      });
    });
  }

  private createFormPassword() {
    return this.FB.group({
      old_password: ['',  [
        Validators.required,
        Validators.minLength(6)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        CustomValidators.checkEquallyString
      ]],
      repeat_new_password: ['', [
        Validators.required,
        Validators.minLength(6),
        CustomValidators.checkEquallyStringReverse
      ]]
    });
  }

  private createFormUsersData() {
    return this.FB.group({
      login: [this.user.login, [
        Validators.required,
        Validators.minLength(3)
      ], [
        this.checkLoginService.bind(this)
      ]
      ],
      name: [this.user.name],
      surname: [this.user.surname]
    });
  }

  /* Отправляем запрос на изменение пароля */
  onSubmitPassword()  {
    this.userService.postPasswordData(this.password_form.value).subscribe(data => {
      if (data.success) {
        this.updated.password_form = true;
        setTimeout(() => {      // Возращаем все как было
          this.updated.password_form = false;
          this.password_form.reset()
          this.password_form.markAsPristine();
        }, 3000);
      } else {
        // Иформация об ошибке
        console.error('userService.postPasswordData', data);
      }
    }, error => {
      console.error('userService.postPasswordData', error);
    });
  }

  onSubmit() {
    this.userService.postUserData(this.users_data.value).subscribe(data => {
      if (data.success) {
        this.updated.users_data = true; // Говорим что обновили данные
        setTimeout(() => {      // Возращаем все как было
          this.updated.users_data = false;
          this.users_data.markAsPristine();
        }, 3000);
      } else {
        // Надо выводить какую-то информацию об ошибке
        console.error('userService.postUserData', data);
      }
    }, error => {
      console.error('userService.postUserData', error);
    });
  }

  ngOnInit() {
    this.users_data = this.createFormUsersData();
    this.password_form = this.createFormPassword();
    this.avatar_src = this.user.avatar;
  }
}
