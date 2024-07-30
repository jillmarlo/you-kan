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
      return this.http.put<Task>(`${this.apiRoot}/${updateTask.task_id}`, updateTask);
    }
  
    // remove a task
    deleteTask(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`);
    }
}