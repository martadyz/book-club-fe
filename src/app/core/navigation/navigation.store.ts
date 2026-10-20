import { computed, inject, Injectable, signal } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigationStore {
  private readonly router = inject(Router);

  private readonly _isNavigating = signal(false);

  readonly isNavigating = this._isNavigating.asReadonly();

  constructor() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this._isNavigating.set(true);
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this._isNavigating.set(false);
      }
    });
  }
}