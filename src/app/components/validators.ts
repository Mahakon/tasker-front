import { AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

export class CustomValidators {
  constructor(private http: HttpClient) { }

  static checkEquallyString(field: AbstractControl): boolean | any {
    if (!field.parent) {
      return null;
    }

    // console.log(field, field.parent.value.old_password, field.value);
    return field.parent.value.old_password === field.value ?
      {equally: 'Новый пароль не может совпадать со старым'} : null;
  }

  static checkEquallyStringReverse(field: AbstractControl): boolean | any {
    if (!field.parent) {
      return null;
    }
    // console.log(field, field.parent.value.password, field.value);
    return field.parent.value.password === field.value ?
      null : {equally: 'Пароли не совпадают'};
  }


}
