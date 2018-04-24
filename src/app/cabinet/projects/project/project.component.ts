import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Project, ProjectService} from '../../../services/cabinet/projects/project.service';
import {Router} from '@angular/router';
import {UserService} from '../../../services/cabinet/user/user.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./styles/project-default.less'],
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  @Output() delete: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
  ) { }

  onDelete() {
    this.projectService.deleteProject(
      this.userService.userId,
      this.project.id)
      .subscribe(
        value => {
          console.log(value);
          this.delete.emit(this.project.id);
        }
      );
  }

  ngOnInit() {}
}
