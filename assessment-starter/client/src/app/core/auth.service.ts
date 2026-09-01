import { environment } from '../../environments/environment';
import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

interface AuthResponse {
  token: string;
  username: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  readonly username = signal(localStorage.getItem('username'));

  get token() {
    return localStorage.getItem('token');
  }

  get authenticated() {
    return !!this.token;
  }

  login(value: { username: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth/login`, value)
      .pipe(tap(x => this.save(x)));
  }

  register(value: { username: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${environment.apiUrl}/api/auth/register`, value)
      .pipe(tap(x => this.save(x)));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.username.set(null);
    void this.router.navigate(['/login']);
  }

  private save(response: AuthResponse) {
    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    this.username.set(response.username);
  }
}
