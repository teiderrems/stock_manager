import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '../src/state/auth/auth.state';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const store=inject(Store);
  const token=store.selectSignal(AuthState.getAccessToken);
  let reqWithHeader=null;
  if (!req.url.includes("pictures") && !req.url.endsWith("items")) {
    reqWithHeader = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token()}`),
    });
  }
  return next(reqWithHeader??req);
};
