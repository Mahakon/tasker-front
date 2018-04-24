import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Task, TaskComment, TaskService} from '../../../services/cabinet/dashboard/task.service';
import {Status} from '../../../services/cabinet/dashboard/task.service';
import {CurrentDashboardService, DashboardEvents} from '../../../services/cabinet/dashboard/current-dashboard.service';
import {ISubscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-task-redaction',
  templateUrl: './task-redaction.component.html',
  styleUrls: ['./styles/task-redaction.component.less']
})
export class TaskRedactionComponent implements OnInit, OnDestroy {
  @Output() close: EventEmitter<any> = new EventEmitter();
  formVisibality = false;
  @Input() task: Task;
  @Input() curUserId: number;
  commentList: TaskComment[] = [];
  selectedStatus: Status;
  inputMessage = '';
  subscriotionToAddComment: ISubscription;

  constructor(
    private currentDashboardService: CurrentDashboardService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.selectedStatus = this.task.status;
    this.taskService.getComments(this.task)
      .subscribe(
        comments => {
          console.log(comments);
          this.commentList = comments;
          this.formVisibality = true;
        },
        err => {
          console.log(err);
        }
      );

    this.subscriotionToAddComment = this.currentDashboardService.getSubscriptionToEvent(DashboardEvents.ADD_COMMENT)
      .subscribe(
        comment => {
          this.getNewComment(comment);
        }
      );
  }

  ngOnDestroy(): void {
    this.subscriotionToAddComment.unsubscribe();
  }

  onClose() {
    this.formVisibality = false;
    this.close.emit(null);
  }

  onUpdate() {
    if (this.selectedStatus !== this.task.status) {
      this.task.status = this.selectedStatus;
      this.currentDashboardService.websocket.next({
        event: DashboardEvents.CHANGE_STATUS,
        task: this.task
      });
    }
    this.onClose();
  }

  sendNewComment() {
    if (this.inputMessage !== '') {
      this.currentDashboardService.websocket.next({
        event: DashboardEvents.ADD_COMMENT,
        comment: {
          id: undefined,
          task_id: this.task.id,
          user_id: this.curUserId,
          content: this.inputMessage
        },
        task: {
          taskId: this.task.id,
          userId: this.curUserId,
          discription: this.inputMessage,
          status: this.task.discription
        }
      });
      this.inputMessage = '';
    }
  }

  getNewComment(comment) {
    this.commentList.push(comment);
  }

}
