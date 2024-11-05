import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';

export const isAdminOrGuestGuard: CanActivateFn = (route, state) => {
  let store=inject(Store);
  let user=store.selectSignal(AuthState.getUser);
  let error=store.selectSignal(AuthState.getError);
  if (state.url.endsWith("users")) {
    if (user()?.roles?.includes("admin") ||user()?.roles?.includes("guest")) {
      return true;
    }
  }
  if (user() || (error() && error().status===401 || error().message?.includes("401 Unauthorized")) && state.url.endsWith("login") || state.url.endsWith("register")) {
    
    return true;
  }
  if ( user() && state.url.endsWith("login")) {

    return false;

  }
  return false;
};
