import {
  HttpErrorResponse,
  HttpInterceptorFn
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      switch (error.status) {
        case 0:
          console.error('Backend is unavailable');
          break;

        case 400:
          console.error(
            'Bad request:',
            getErrorMessage(error)
          );
          break;

        case 401:
          console.error('Unauthorized');

          router.navigate(['/login']);
          break;

        case 403:
          console.error('Forbidden');
          break;

        case 404:
          console.error('Resource not found');
          break;

        case 500:
          console.error('Server error');
          break;

        default:
          console.error(
            `Unexpected HTTP error: ${error.status}`,
            error
          );
      }

      return throwError(() => error);
    })
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (typeof error.error === 'string') {
    return error.error;
  }

  if (error.error?.message) {
    return error.error.message;
  }

  return error.message;
}