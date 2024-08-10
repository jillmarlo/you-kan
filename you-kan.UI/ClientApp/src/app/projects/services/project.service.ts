import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Project } from '../models/project.model';
import { AuthService } from '../../auth.service';

@Injectable({ providedIn: 'root' })
export class ProjectService {

  protected http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiRoot = 'http://localhost:8000/api/projects';

  constructor() {}

  private addCsrfToken(headers: HttpHeaders = new HttpHeaders()): Observable<HttpHeaders> {
    return this.authService.getCsrfToken().pipe(
      switchMap(csrfToken => {
        return new Observable<HttpHeaders>(observer => {
          observer.next(headers.set('X-CSRF-Token', csrfToken));
          observer.complete();
        });
      })
    );
  }

  // Get all projects
  getProjects(): Observable<Project[]> {
    return this.addCsrfToken().pipe(
      switchMap(headers => this.http.get<Project[]>(this.apiRoot, { headers, withCredentials: true }))
    );
  }

  // Get all projects by user
  getProjectsForUser(): Observable<Project[]> {
    return this.addCsrfToken().pipe(
      switchMap(headers => this.http.get<Project[]>(this.apiRoot, { headers, withCredentials: true }))
    );
  }

  // Get project by projectId
  getProject(id: number): Observable<Project> {
    return this.addCsrfToken().pipe(
      switchMap(headers => this.http.get<Project>(`${this.apiRoot}/${id}`, { headers, withCredentials: true }))
    );
  }

  // Create a new project
  createProject(project: Project): Observable<Project> {
    return this.addCsrfToken().pipe(
      switchMap(headers => this.http.post<Project>(this.apiRoot, { project_name: project.project_name }, { headers, withCredentials: true }))
    );
  }

  // Update an existing project
  updateProject(updateProject: any): Observable<Project> {
    return this.addCsrfToken().pipe(
      switchMap(headers => this.http.put<Project>(`${this.apiRoot}/${updateProject.project_id}`, updateProject, { headers, withCredentials: true }))
    );
  }

  // Remove a project
  deleteProject(id: number): Observable<void> {
    return this.addCsrfToken().pipe(
      switchMap(headers => this.http.delete<void>(`${this.apiRoot}/${id}`, { headers, withCredentials: true }))
    );
  }
}