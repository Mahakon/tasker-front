import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../services/cabinet/projects/project.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./styles/project-default.less'],
})
export class ProjectComponent implements OnInit {

  @Input() project: Project;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {}
}
