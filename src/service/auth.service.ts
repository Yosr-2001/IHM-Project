// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://votre-api.com/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkAuthState();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap(response => {
        // localStorage.setItem('auth_token', response.token);
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  private checkAuthState(): void {
    const token = localStorage.getItem('auth_token');
    this.isAuthenticatedSubject.next(!!token);
  }
}