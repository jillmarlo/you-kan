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

    // get all tasks
    getSprints(): Observable<Sprint[]> {
      return this.http.get<Sprint[]>(this.apiRoot);
    }
  
    // get task by taskId
    getSprint(id: number): Observable<Sprint> {
      return this.http.get<Sprint>(`${this.apiRoot}/${id}`);
    }
  
    // create a new task
    createSprint(sprint: Sprint): Observable<Sprint> {
      return this.http.post<Sprint>(this.apiRoot, sprint);
    }
  
    // update an existing task
    updateSprint(updateSprint: Sprint): Observable<Sprint> {
      return this.http.put<Sprint>(`${this.apiRoot}/${updateSprint.sprint_id}`, updateSprint);
    }
  
    // remove a task
    deleteSprint(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`);
    }



  //mock user objects until back end is hooked up
  // users: User[] = [
  //   {
  //     id: 1,
  //     name: 'User name 1',
  //     tasks: []
  //   },
  //   {
  //       id: 2,
  //       name: 'User name 2',
  //       tasks: []
  //     }
  // ];

  //mock task objects until back end is hooked up 
  // tasks: Task[] = [
  //   {
  //     name: 'Task 1',
  //     type: TaskType.Feature,
  //     priority: Priority.Medium,
  //     description:
  //       'Test description for task 1, blah blah blah',
  //     status: TaskStatus.Uncommitted,
  //     assignee: this.users[0],
  //     creator: this.users[1],
  //     comments: [],
  //     effort: 1
  //   },
  //   {
  //     name: 'Task 1',
  //     type: TaskType.Feature,
  //     priority: Priority.Medium,
  //     description:
  //           'Test description for task 2, blah blah blah blah blah blah blah blah blah blah blah blah',
  //     status: TaskStatus.Uncommitted,
  //     assignee: this.users[1],
  //     creator: this.users[0],
  //     comments: [],
  //     effort: 1
  //   },
  // ];
}