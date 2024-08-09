import { inject, Injectable } from '@angular/core';
import { Sprint } from '../models/sprint.model';
//import { User } from '../../user-management/models/user.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SprintService {

  protected http = inject(HttpClient);
  private apiRoot = 'http://localhost:8000/api/sprints';

  constructor() {}

    // get sprints by project id
    getSprints(projectId: number): Observable<Sprint[]> {
      return this.http.get<Sprint[]>(`${this.apiRoot}/project/${projectId}`);
    }
  
    // create a new sprint
    createSprint(sprint: Sprint): Observable<Sprint> {
      return this.http.post<Sprint>(this.apiRoot, sprint);
    }
  
    // update an existing sprint
    updateSprint(updateSprint: Sprint): Observable<Sprint> {
      const params = new HttpParams().set('user_id', 1);
      return this.http.put<Sprint>(`${this.apiRoot}/${updateSprint.sprint_id}`, updateSprint, {params});
    }
  
    // remove a sprint
    deleteSprint(id: any): Observable<void> {
      const params = new HttpParams().set('user_id', 1);
      return this.http.delete<void>(`${this.apiRoot}/${id}`, {params});
    }
}