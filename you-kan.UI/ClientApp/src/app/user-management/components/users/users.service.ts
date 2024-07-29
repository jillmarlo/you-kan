import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  protected http = inject(HttpClient);
  private apiRoot = '';

  constructor() {}

    // get all users
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiRoot);
    }
  
    // get task by userID
    getUser(user_id: number): Observable<User> {
      return this.http.get<User>(`${this.apiRoot}/${user_id}`);
    }
  
    // create a new user
    createUser(user: User): Observable<User> {
      return this.http.post<User>(this.apiRoot, user);
    }
  
    // update an existing user
    updateUser(updateUser: User): Observable<User> {
      return this.http.put<User>(`${this.apiRoot}/${updateUser.user_id}`, updateUser);
    }
  
    // remove a user
    deleteUser(user_id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${user_id}`);
    }
}