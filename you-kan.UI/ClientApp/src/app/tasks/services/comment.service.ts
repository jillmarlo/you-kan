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
    getCommentsForTask(taskId: any): Observable<any[]> {
      const params = new HttpParams().set('task_id', taskId);
      return this.http.get<any[]>(this.apiRoot, {params});
    }

    getCommentById(id: any): Observable<Comment> {
      const params = new HttpParams().set('id', id);
      return this.http.get<Comment>(this.apiRoot, {params});
    }

    // create a new task
    createComment(comment: any): Observable<any> {
      return this.http.post<any>(this.apiRoot, comment);
    }
  
    // remove a task
    deleteComment(id: number | any): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${id}`);
    }
}