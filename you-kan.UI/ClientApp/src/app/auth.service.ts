import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ReplaySubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Update with server URL

  // observable for toggling dashboard nav/toolbar
  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private http: HttpClient) { this.isLoggedIn.next(false) }

  // Get CSRF token
  getCsrfToken(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/csrf-token`, { withCredentials: true });
  }

  // Login method with CSRF token
  login(email: string, password: string): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(csrfToken => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken.csrfToken
        });
        return this.http.post<any>(`${this.apiUrl}/login/password`, { email, password }, { headers, withCredentials: true });
      })
    );
  }

  // Register method with CSRF token
  register(user: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((csrfToken) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken.csrfToken
        });
        return this.http.post(`${this.apiUrl}/register`, user, { headers, withCredentials: true });
      })
    );
  }

  // Logout method with CSRF token
  logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap((csrfToken) => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken.csrfToken
        });
        return this.http.post(`${this.apiUrl}/logout`, {}, { headers, withCredentials: true });
      })

    );
  }
}
