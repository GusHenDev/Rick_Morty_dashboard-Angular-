import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = signal<boolean>(this.hasToken());

  isLoggedIn = this._isLoggedIn.asReadonly();

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '123456') {
      localStorage.setItem('token', 'token-fake-jwt');
      this._isLoggedIn.set(true);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this._isLoggedIn.set(false);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
