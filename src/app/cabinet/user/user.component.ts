import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData, UserService } from '../../services/user.service';
import { host } from '../../config';
import { NgForm, FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
  }
  public avatar: File = null;

  onSubmitAvatar() {
    console.log('avatar update');
    console.log(this.avatar);
  }

  handleFileInput(files: FileList) {
    this.avatar = files.item(0);
    console.log(files);
  }

  uploadFileToActivity() {
    console.log('1');
  }
  
  get user(): UserData {
    let user = {};
    return Object.assign(user, this.route.parent.snapshot.data.user);
  }

  public password = {
    old_password: '',
    password: '',
    repeat_old_password: ''
  }


  onSubmit() {
    this.userService.postUserData(this.user).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });
  }

  ngOnInit() {

  }
}
