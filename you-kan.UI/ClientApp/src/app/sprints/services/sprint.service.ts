import { inject, Injectable } from '@angular/core';
import { Sprint } from '../models/sprint.model';
//import { User } from '../../user-management/models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SprintService {

  protected http = inject(HttpClient);
  private apiRoot = '';

  constructor() {}

    // get all sprints
    getSprints(): Observable<Sprint[]> {
      return this.http.get<Sprint[]>(this.apiRoot);
    }
  
    // get task by sprintId
    getSprint(id: number): Observable<Sprint> {
      return this.http.get<Sprint>(`${this.apiRoot}/${id}`);
    }
  
    // create a new sprint
    createSprint(sprint: Sprint): Observable<Sprint> {
      return this.http.post<Sprint>(this.apiRoot, sprint);
    }
  
    // update an existing sprint
    updateSprint(updateSprint: Sprint): Observable<Sprint> {
      return this.http.put<Sprint>(`${this.apiRoot}/${updateSprint.sprint_id}`, updateSprint);
    }
  
    // remove a sprint
    deleteSprint(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`);
    }
}