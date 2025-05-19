import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@core/config/environment';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private API_URL = `${environment.apiBaseUrl}/sessions`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllSessions(): Observable<any> {
    return this.http.get(this.API_URL, {
      headers: this.getAuthHeaders(),
    });
  }

  getSessionsWithAgendas(): Observable<any> {
    return this.http.get(`${this.API_URL}?include_agendas=true`, {
      headers: this.getAuthHeaders(),
    });
  }

  getSessionById(id: number): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  createSession(sessionData: any): Observable<any> {
    return this.http.post(this.API_URL, sessionData, {
      headers: this.getAuthHeaders(),
    });
  }

  updateSession(id: number, sessionData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, sessionData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteSession(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }
}
