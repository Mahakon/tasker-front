import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./styles/task-list.component.less']
})
export class TaskListComponent implements OnInit {

  @Input() status;
  @Input() taskList;
  constructor() { }

  ngOnInit() {
  }

}
