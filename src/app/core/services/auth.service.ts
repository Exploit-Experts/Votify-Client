import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '@core/config/environment';
import { AuthCredentials } from '@core/models/auth.model';
import { User } from '@core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = `${environment.apiBaseUrl}/auth`;
  private tokenKey = 'auth_token';
  private authState = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials, { observe: 'response' }).pipe(
      tap(response => {
        const token = response.headers.get('authorization')?.replace('Bearer ', '');
        if (token) {
          localStorage.setItem(this.tokenKey, token);
          this.authState.next(true);
        }
      })
    );
  }

  personalInfo(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/me`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.getToken()}`
      })
    });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  authStatus$(): Observable<boolean> {
    return this.authState.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
