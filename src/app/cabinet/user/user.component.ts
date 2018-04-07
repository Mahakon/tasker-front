import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData, UserService } from '../../services/user.service';
import { host } from '../../config';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: UserData;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
   this.getUserLogin();
  }

  getUserLogin(): void {
    console.log(this.userService.userId);
    this.userService.getUserData(this.userService.userId)
      .subscribe(
        user => this.user = user,
        err => { console.log(err); });
  }
}
