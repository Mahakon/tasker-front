import { Injectable } from '@angular/core';
import {Project} from './project.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {host} from '../../../config';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ProjectListService {

  listOfProjects: Project[];
  currentProject: Project;
  private subject = new Subject<any>();

  constructor(
    private router: Router,
    private http: HttpClient
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
  addProjectToUser(code: string, id: number): Observable<any> {
    const url = host + 'cabinet/dashboard/share/addUser/' + code + `?id=${id}`;
    return this.http.get(url);
  }
}
