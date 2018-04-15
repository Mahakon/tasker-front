import { Injectable } from '@angular/core';
import {Project} from './project.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';


@Injectable()
export class ProjectListService {

  listOfProjects: Project[];
  currentProject: Project;
  private subject = new Subject<any>();

  constructor(
    private router: Router
  ) {
    this.listOfProjects = [];
    this.currentProject = {
      id: undefined,
      title: ''
    };
  }

  sendCurrentProjectId(id: number) {
    this.subject.next(id);
  }

  getCurrentProject(): Observable<any> {
    return this.subject.asObservable();
  }
}
