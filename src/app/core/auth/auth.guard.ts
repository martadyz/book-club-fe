import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from './auth.store';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore
    .checkSession()
    .pipe(
      map(isAuthenticated => {

        if (isAuthenticated) {
          return true;
        }

        return router.createUrlTree([
          '/login'
        ]);
      })
    );
};