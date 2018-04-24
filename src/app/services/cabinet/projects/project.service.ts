import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {UserIdData} from '../../sign/sign-in.service';
import {host} from '../../../config';

export interface Project {
  id: number;
  title: string;
}

export interface Repositoty {
  accountname: string;
  slug: string;
}

@Injectable()
export class ProjectService {

  constructor(private http: HttpClient) { }

  addProject(data: FormData): Observable<Project> {
    const url = host + 'cabinet/projects/add';
    return this.http.post<Project>(url, data);
  }

  deleteProject(userId: number, projectId: number): Observable<any> {
    const url = host + `cabinet/projects/delete?userId=${userId}&projectId=${projectId}`;
    return this.http.get<any>(url);
  }

  getRepositories(userId: number): Observable<Repositoty[]> {
    const url = host + `cabinet/projects/bitbucket?id=${userId}`;
    return this.http.get<Repositoty[]>(url);
  }

  getBranches(userId: number, repository: Repositoty): Observable<any> {
    const url = host + `cabinet/projects/bitbucket/getbranches` +
                       `?id=${userId}&` +
                       `acountname=${repository.accountname}&` +
                       `slug=${repository.slug}`;
    console.log(url);
    return this.http.get<any>(url);
  }
}
