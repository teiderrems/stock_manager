import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';

export const matchRouteGuard: CanMatchFn = (route, segments) => {
  const store=inject(Store);
  const user=store.selectSignal(AuthState.getUser);
  const error=store.selectSignal(AuthState.getError);
  
  if (error() && (error().status===401 || error().message?.includes("401 Unauthorized")) && route.path?.endsWith("login") ) {

    return true;

  }
  if ( user() && (route.path?.endsWith("login") || route.path?.endsWith("register"))) {

    return false;
  }

  return true;
};
