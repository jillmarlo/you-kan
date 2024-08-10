import { inject, Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {

  protected http = inject(HttpClient);
  private apiRoot = 'http://localhost:8000/api/users';

  constructor() {}

    // get all users
    getUsers(): Observable<User[]> {
      return this.http.get<User[]>(this.apiRoot, { withCredentials: true });
    }

    //TODO- getUsersForProject(id: number)??
  
    // get user by userID
    getUser(user_id: number): Observable<User> {
      return this.http.get<User>(`${this.apiRoot}/${user_id}`, {withCredentials: true});
    }
  
    // create a new user
    createUser(user: User): Observable<User> {
      return this.http.post<User>(this.apiRoot, user, {withCredentials: true});
    }
  
    // update an existing user
    updateUser(updateUser: User): Observable<User> {
      return this.http.put<User>(`${this.apiRoot}/${updateUser.user_id}`, updateUser, {withCredentials: true});
    }
  
    // remove a user
    deleteUser(user_id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiRoot}/${user_id}`, {withCredentials: true});
    }
}