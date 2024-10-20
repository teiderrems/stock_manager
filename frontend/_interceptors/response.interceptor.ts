import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../src/state/auth/auth.state';
import { ActionOnAuthFailled, RefreshTokenAction } from '../src/state/auth/auth.actions';

import { HttpEvent, HttpResponse, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, exhaustMap, map, throwError } from 'rxjs';



export const responseInterceptor: HttpInterceptorFn = (req, next) => {
  const store=inject(Store);
  const refreshToken=store.selectSignal(AuthState.getRefreshToken);
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        
        console.log('Response intercepted:', event);
        
      }
      return event;
    }),
    catchError((error: HttpErrorResponse) => {

      if (error.status==401 || error.message.includes("Unauthorize")) {

        exhaustMap(()=>store.dispatch(new RefreshTokenAction({refreshToken:refreshToken()})));
      }
      
      return throwError(() => store.dispatch(new ActionOnAuthFailled(error.message,error.status)));
    })
  );
};

