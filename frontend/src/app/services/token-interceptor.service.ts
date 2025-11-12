import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const userService = inject(UserService);
  const authService = inject(AuthService);

  const token = localStorage["JWT_TOKEN"];
  let authReq = addTokenHeader(req, token);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Handle refresh token
        const refreshToken = localStorage[authService.REFRESH_TOKEN];

        return userService.genarateRefreshToken(refreshToken).pipe(
          switchMap((data: any) => {
            authService.setAccessTokenAndRefreshToken(data);
            const newToken = localStorage[authService.JWT_TOKEN];
            const newReq = addTokenHeader(req, newToken);
            return next(newReq);
          }),
          catchError(err => {
            authService.logout();
            return throwError(() => err);
          })
        );
      }
      return throwError(() => error);
    })
  );
};

function addTokenHeader(request: any, token: string) {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}
