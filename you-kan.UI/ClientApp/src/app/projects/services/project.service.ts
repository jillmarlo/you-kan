import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  protected http = inject(HttpClient);
  private apiRoot = '';

  constructor() {}

    // get all projects
    getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.apiRoot);
    }
  
    // get project by projectId
    getProject(id: number): Observable<Project> {
      return this.http.get<Project>(`${this.apiRoot}/${id}`);
    }
  
    // create a new project
    createProject(sprint: Project): Observable<Project> {
      return this.http.post<Project>(this.apiRoot, sprint);
    }
  
    // update an existing project
    updateProject(updateSprint: Project): Observable<Project> {
      return this.http.put<Project>(`${this.apiRoot}/${updateSprint.project_id}`, updateSprint);
    }
  
    // remove a project
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`);
    }
}