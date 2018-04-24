import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignInService } from '../../services/sign/sign-in.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.less']
})
export class ShareComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private signService: SignInService
  ) { }

  ngOnInit() {    
    if (this.route.snapshot.params.code) {
      localStorage.setItem('share_link', this.route.snapshot.params.code);
      localStorage.setItem('share_link_time',  Date.now().toString());
    }
    this.router.navigate(
      ['/cabinet'],
      { relativeTo: this.route }
    );
  }

}
