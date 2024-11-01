import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';

export const isAdminOrGuestGuard: CanActivateFn = (route, state) => {
  let store=inject(Store);
  let user=store.selectSignal(AuthState.getUser);
  if (state.url.endsWith("users")) {
    if (user()?.roles?.includes("admin") ||user()?.roles?.includes("guest")) {
      return true;
    }
  }
  return false;
};
