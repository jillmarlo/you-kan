import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  protected http = inject(HttpClient);
  private apiRoot = 'http://localhost:8000/api/projects';

  constructor() {}

    // get all projects
    getProjects(): Observable<Project[]> {
      return this.http.get<Project[]>(this.apiRoot);
    }
  
    // get all projects by user 
    getProjectsForUser(): Observable<Project[]> {
      return this.http.get<Project[]>('http://localhost:8000/api/projects/user?user_id=1');
    }

    // get project by projectId
    getProject(id: number): Observable<Project> {
      return this.http.get<Project>(`${this.apiRoot}/${id}`);
    }
  
    // create a new project
    createProject(project: Project): Observable<Project> {
      return this.http.post<Project>(this.apiRoot, {project_name: project.project_name, creator_user_id: 1});
    }
  
    // update an existing project
    updateProject(updateProject: any): Observable<Project> {
      const params = new HttpParams().set('user_id', 1);
      return this.http.put<Project>(`${this.apiRoot}/${updateProject.project_id}`, updateProject, {params});
    }
  
    // remove a project
    deleteProject(id: number): Observable<void> {
      const params = new HttpParams().set('user_id', 1);
      return this.http.delete<void>(`${this.apiRoot}/${id}`, {params});
    }
}