import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {UserIdData} from '../../sign/sign-in.service';
import {host} from '../../../config';

export interface Project {
  id: number;
  title: string;
}

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(data: FormData): Observable<Project> {
    const url = host + '/cabinet/projects/add';
    return this.http.post<Project>(url, data);
  }
}
