import {Component, Input, OnInit} from '@angular/core';
import {TaskComment} from '../../../services/cabinet/dashboard/task.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.less']
})
export class CommentComponent implements OnInit {

  @Input() comment: TaskComment;
  @Input() curUserId: number;

  constructor() { }

  ngOnInit() {
  }

}
