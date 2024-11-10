import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../src/state/auth/auth.state';
import { ActionOnAuthFailled, RefreshTokenAction } from '../src/state/auth/auth.actions';

import { HttpEvent, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import {catchError, EMPTY, map, throwError} from 'rxjs';
import { Router } from '@angular/router';



export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const store=inject(Store);
  const router=inject(Router);
  const refreshToken=store.selectSignal(AuthState.getRefreshToken);
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      return event;
    }),
    catchError((error: HttpErrorResponse) => {

      if (error.status==401 || error.message.includes("401 Unauthorized")) {
        if (refreshToken().length===0) {
          router.navigateByUrl(`/login?returnUrl=${router.url}`);
        }
        else{

          return throwError(() => store.dispatch([new RefreshTokenAction({refreshToken:refreshToken()}),new ActionOnAuthFailled(error.message,error.status)]));

         }
      }
      return EMPTY;
    })
  );
};

