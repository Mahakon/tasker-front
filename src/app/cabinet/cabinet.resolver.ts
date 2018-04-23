import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserData, UserService} from '../services/cabinet/user/user.service';
import {ProjectListService} from '../services/cabinet/projects/project-list.service';

@Injectable()
export class CabinetResolver implements Resolve<UserData> {

  constructor(private userService: UserService,
              private projectListService: ProjectListService) {}

  resolve(): Observable<UserData> {
    /*
          Проверяем рефералку
        */
    if (localStorage.getItem('share_link') && localStorage.getItem('share_link_time')){
      const share_link = localStorage.getItem('share_link');
      const share_link_time = localStorage.getItem('share_link_time');
      const current_time = Date.now();
      if (current_time - parseInt(share_link_time, 10) <= 60 * 5 * 1000) {
        // Тут отправляем запрос
        this.projectListService.addProjectToUser(share_link, this.userService.userId).subscribe(res => console.log(res));
      } else {
        console.log('Ссылка устарела');
      }
      localStorage.removeItem('share_link_time');
      localStorage.removeItem('share_link');
    }
    return this.userService.getUserData(this.userService.userId);
  }
}
