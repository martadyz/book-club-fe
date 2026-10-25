
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, delay, finalize, map, Observable, of, tap } from 'rxjs';

import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export interface CurrentUser {
  id: number;
  username: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
}

export type AuthStatus =
  | 'unknown'
  | 'authenticated'
  | 'unauthenticated';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly _user = signal<CurrentUser | null>(null);
  private readonly _userId = signal<number | null>(null);
  private readonly _status = signal<AuthStatus>('unknown');
  private readonly _loading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly user = this._user.asReadonly();
  readonly userId = this._userId.asReadonly();
  readonly status = this._status.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  readonly isAuthenticated = computed(
    () => this._status() === 'authenticated'
  );

  readonly isAdmin = computed(
    () => this._user()?.role.includes('ADMIN')
  );

  loadCurrentUser() {
    this._loading.set(true);
    this._error.set(null);
    return this.authService.getCurrentUser().pipe(
      tap(user => {
        this._user.set(user);
        this._userId.set(user.id);
        this._status.set('authenticated');
        this._loading.set(false);
      }),

      catchError(() => {
        this._user.set(null);
        this._userId.set(null);
        this._status.set('unauthenticated');
        this._error.set('Cannot load current user');
        this._loading.set(false);
        return of(null);
      })
    );
  }


  checkSession(): Observable<boolean> {
    
    if (this._status() === 'authenticated') {
      return of(true);
    }

    if (this._status() === 'unauthenticated') {
      return of(false);
    }

    return this.authService
      .getCurrentUser()
      .pipe(
        delay(3000),
        tap(user => {
          this._user.set(user);
          this._userId.set(user.id);
          this._status.set('authenticated');
        }),

        map(() => true),

        catchError(() => {
          this._user.set(null);
          this._userId.set(null);
          this._status.set('unauthenticated');

          return of(false);
        })
      );
  }

  login(username: string, password: string): void {
    this._loading.set(true);
    this._error.set(null);
    this._userId.set(null);
    this.authService
      .login(username, password)
      .pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({
        next: user => {
          this._user.set(user as CurrentUser
          );
          this._userId.set((user as CurrentUser).id);
          this._status.set('authenticated');
        },

        error: () => {
          this._user.set(null);
          this._userId.set(null);
          this._status.set('unauthenticated');
          this._error.set('Invalid username or password');
        }
      });
  }

  logout(): void {
    this._loading.set(true);
    this._error.set(null);
    this.authService.logout()
      .pipe(
        finalize(() => this._loading.set(false))
      )
      .subscribe({
        next: () => {
          this._user.set(null);
          this._status.set('unauthenticated'); 
          this.router.navigate([
            '/login'
          ]);
        }
    });
  }
}