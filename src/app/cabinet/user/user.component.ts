import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../user.service';
import {User} from './user';
import {host} from '../../config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {
  @Input() user: User;
  private id: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserLogin();
  }

  goToSignUp() {
    this.router.navigate(
      ['/sign-in'],
      { relativeTo: this.route }
    );
  }

  logOut() {
    const  url = host + 'user/' + this.id + '/logout';
    fetch(url, {method: 'POST'})
      .then(
        res => res.json(),
        err => err
      )
      .then(
        body => {
          console.log(body);
          this.goToSignUp();
        },
        err => console.log(err)
      );
  }

  getUserLogin(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUserData(this.id)
      .subscribe(user => this.user = user);
  }

}
