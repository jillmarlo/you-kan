import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommentService {

  protected http = inject(HttpClient);
  private apiRoot = 'http://localhost:8000/api/comments';

  constructor() {}

    // get comments for task
    getCommentsForTask(taskId: any): Observable<Comment[]> {
      const params = new HttpParams().set('id', taskId);
      return this.http.get<Comment[]>(this.apiRoot, {params});
    }

    // create a new task
    createComment(comment: Comment): Observable<Comment> {
      return this.http.post<Comment>(this.apiRoot, comment, { withCredentials: true });
    }
  
    // // update an existing task
    // updateTask(updateTask: Task): Observable<Task> {
    //   return this.http.put<Task>(`${this.apiRoot}/${updateTask.task_id}`, updateTask, { withCredentials: true });
    // }
  
    // remove a task
    deleteComment(id: number | any): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`, { withCredentials: true });
    }
}