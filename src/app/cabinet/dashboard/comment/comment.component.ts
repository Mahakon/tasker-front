import {Component, Input, OnInit} from '@angular/core';
import {TaskComment} from '../../../services/cabinet/dashboard/task.service';
import {static_host} from '../../../config';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  @Input() comment: TaskComment;
  @Input() curUserId: number;
  static_host;
  constructor() { }

  ngOnInit() {
    this.static_host  = static_host;
    // console.log('Комментарий', this.comment);
   //  console.log(this.comment.user_id, this.curUserId);
  }

}
