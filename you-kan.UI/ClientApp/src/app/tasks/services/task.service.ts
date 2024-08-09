import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {

  protected http = inject(HttpClient);
  private apiRoot = 'http://localhost:8000/api/tasks';

  constructor() {}

    // get all tasks
    getTasks(): Observable<Task[]> {
      return this.http.get<Task[]>(this.apiRoot, { withCredentials: true });
    }

    // get all tasks
    getTasksForProject(projectId: number): Observable<Task[]> {
      const params = new HttpParams().set('project_id', projectId.toString());
      return this.http.get<Task[]>('http://localhost:8000/api/tasks/', {params});
    }
  
    // get task by taskId
    getTask(id: number): Observable<Task> {
      return this.http.get<Task>(`${this.apiRoot}/${id}`, { withCredentials: true });
    }
  
    // create a new task
    createTask(task: Task): Observable<Task> {
      return this.http.post<Task>('http://localhost:8000/api/tasks/', task, { withCredentials: true });
    }
  
    // update an existing task
    updateTask(updateTask: Task): Observable<Task> {
      return this.http.put<Task>(`${this.apiRoot}/${updateTask.task_id}`, updateTask, { withCredentials: true });
    }
  
    // remove a task
    deleteTask(id: number | any): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`, { withCredentials: true });
    }
}