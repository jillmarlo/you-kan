import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {

  protected http = inject(HttpClient);
  private apiRoot = '';

  constructor() {}

    // get all tasks
    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(this.apiRoot);
    }
  
    // get task by taskId
    getTask(id: number): Observable<Task> {
      return this.http.get<Task>(`${this.apiRoot}/${id}`);
    }
  
    // create a new task
    createTask(task: Task): Observable<Task> {
      return this.http.post<Task>(this.apiRoot, task);
    }
  
    // update an existing task
    updateTask(updateTask: Task): Observable<Task> {
      return this.http.put<Task>(`${this.apiRoot}/${updateTask.id}`, updateTask);
    }
  
    // remove a task
    deleteTask(id: number): Observable<void> {
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