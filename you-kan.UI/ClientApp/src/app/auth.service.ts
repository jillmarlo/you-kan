import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, switchMap, tap } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000'; // Update with server URL

  // observable for toggling dashboard nav/toolbar
  isLoggedIn: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  private csrfToken: string | null = null;
  private sessionId: string | null = null;

  constructor(private http: HttpClient) { this.isLoggedIn.next(false) }

  // Get CSRF token from the server
  private fetchCsrfToken(): Observable<string> {
    return this.http.get<{ csrfToken: string }>(`${this.apiUrl}/csrf-token`, { withCredentials: true }).pipe(
      tap((response) => {
        this.csrfToken = response.csrfToken;
      }),
      switchMap((response) => of(response.csrfToken))
    );
  }

  // Get stored CSRF token or fetch a new one if not available
  getCsrfToken(): Observable<string> {
    if (this.csrfToken) {
      return of(this.csrfToken);
    } else {
      return this.fetchCsrfToken();
    }
  }

  // Login method with CSRF token
  login(email: string, password: string): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(csrfToken => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || ''  // Provide an empty string if csrfToken is null
        });
        return this.http.post<any>(`${this.apiUrl}/login/password`, { email, password }, { headers, withCredentials: true }).pipe(
          tap((response: any) => {
            this.sessionId = response.sessionId; // Assume the session ID is returned in the response
          })
        );
      })
    );
  }

  // Register method with CSRF token
  register(user: any): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(csrfToken => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || ''  // Provide an empty string if csrfToken is null
        });
        return this.http.post<any>(`${this.apiUrl}/register`, user, { headers, withCredentials: true });
      })
    );
  }

  // Logout method with CSRF token
  logout(): Observable<any> {
    return this.getCsrfToken().pipe(
      switchMap(csrfToken => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || ''  // Provide an empty string if csrfToken is null
        });
        return this.http.post<any>(`${this.apiUrl}/logout`, {}, { headers, withCredentials: true }).pipe(
          tap(() => {
            this.csrfToken = null; // Clear CSRF token on logout
            this.sessionId = null; // Clear session ID on logout
          })
        );
      })
    );
  }

 // Implement the logic to check if the user is authenticated
 isAuthenticated(): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiUrl}/is-authenticated`, { withCredentials: true });
}

// Helper to get the session ID if needed
getSessionId(): string | null {
  return this.sessionId;
}
}
