import { Component, OnInit } from '@angular/core';
import {ProjectListService} from '../../../services/cabinet/projects/project-list.service';
import {Project} from '../../../services/cabinet/projects/project.service';
import {ProjectComponent} from '../project/project.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.less'],
})
export class ProjectListComponent implements OnInit {

  list: Project[];
  defaultProject = {
    id: undefined,
    title: ''
  };

  isShowNewprojectForm = false;

  constructor(
    private projectListService: ProjectListService,
    private router: Router
  ) { }

  ngOnInit() {
    this.list = this.projectListService.listOfProjects;
  }

  changeVisibality() {
    this.isShowNewprojectForm = !this.isShowNewprojectForm;
  }

  addNewProject(value) {
    this.list.push(value);
    this.changeVisibality();
  }

  goToSelectedDashboard(project) {
    this.projectListService.sendCurrentProjectId(project.id);
  }

  deleteProject(projectId) {
    console.log('delete project' + projectId);
    this.list = this.list
      .filter(curProject => {
        return curProject.id !== projectId;
      });
  }
}
