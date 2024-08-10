import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {

  protected http = inject(HttpClient);
  private apiRoot = 'http://localhost:8000/api/users/';

  constructor() {}

    // get all users
    getUsers(): Observable<any> {
      return this.http.get<any>(this.apiRoot);
    }

    //TODO- getUsersForProject(id: number)??
  
    // get user by userID
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