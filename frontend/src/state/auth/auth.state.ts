import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import * as AuthAction from './auth.actions';
import { LoginResponseBody, User } from '../../interfaces';
import { AuthService } from '../../app/account/auth/auth.service';
import { catchError, exhaustMap } from 'rxjs';
import { AuthenticateUser, AuthenticateUserSuccess } from './auth.actions';
import { UserService } from '../../app/admin/user/user.service';


export interface AuthStateModel {
  data: LoginResponseBody;
  user?: User;
  error: {
    message?: string;
    status?: number;
  };
  isSuccess: boolean;
  isError: boolean;
  isLoading: boolean;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    data: {
      accessToken: '',
      refreshToken: '',
      tokenType: '',
      expiresIn: 0,
    },
    error: {},
    isError: false,
    isLoading: true,
    isSuccess: false,
    user: {},
  },
})
@Injectable()
export class AuthState {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Action(AuthAction.LoginAction)
  login(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.LoginAction
  ) {
    return this.authService.login(payload).pipe(
      exhaustMap((value) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateSuccessAction,
          new AuthAction.LoginSuccessAction(value),
          AuthAction.UpdateLoadingAction,
          new AuthenticateUser(payload.email),
        ])
      ),
      catchError((error) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          new AuthAction.ActionOnAuthFailled(error.message, error.status),
          AuthAction.UpdateIsErrorAction,
          AuthAction.UpdateLoadingAction,
        ])
      )
    );
  }

  @Action(AuthenticateUser)
  getAuthenticateUser(
    ctx: StateContext<AuthStateModel>,
    { username }: AuthenticateUser
  ) {
    return this.userService.getUserByUsername(username).pipe(
      exhaustMap((value) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateLoadingAction,
          new AuthenticateUserSuccess(value),
          AuthAction.UpdateSuccessAction
        ])
      ),
      catchError((error) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateIsErrorAction,
          AuthAction.UpdateLoadingAction,
          new AuthAction.ActionOnAuthFailled(error.message, error.status),
        ])
      )
    );
  }

  @Action(AuthenticateUserSuccess)
  updateCurrentUser(
    ctx: StateContext<AuthStateModel>,
    { user }: AuthenticateUserSuccess
  ) {
    ctx.patchState({ user: user });
  }

  @Action(AuthAction.RegisterAction)
  register(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.RegisterAction
  ) {
    return this.authService.register(payload).pipe(
      exhaustMap(() =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateSuccessAction,
          AuthAction.UpdateLoadingAction,
        ])
      ),
      catchError((error) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          new AuthAction.ActionOnAuthFailled(error.message, error.status),
          AuthAction.UpdateIsErrorAction,
          AuthAction.UpdateLoadingAction,
        ])
      )
    );
  }

  @Action(AuthAction.ResetPasswordAction)
  resetPassword(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.ResetPasswordAction
  ) {
    return this.authService.resetPassword(payload).pipe(
      exhaustMap(() =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateSuccessAction,
          AuthAction.UpdateLoadingAction,
        ])
      ),
      catchError((error) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          new AuthAction.ActionOnAuthFailled(error.message, error.status),
          AuthAction.UpdateIsErrorAction,
          AuthAction.UpdateLoadingAction,
        ])
      )
    );
  }

  @Action(AuthAction.ForgotPasswordAction)
  forgotPassword(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.ForgotPasswordAction
  ) {
    return this.authService.forgotPassword(payload).pipe(
      exhaustMap(() =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateLoadingAction,
          AuthAction.UpdateSuccessAction
        ])
      ),
      catchError((error) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          new AuthAction.ActionOnAuthFailled(error.message, error.status),
          AuthAction.UpdateLoadingAction,
          AuthAction.UpdateIsErrorAction
        ])
      )
    );
  }

  @Action(AuthAction.RefreshTokenAction)
  refreshToken(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.RefreshTokenAction
  ) {
    return this.authService.refreshToken(payload.refreshToken).pipe(
      exhaustMap((value) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          AuthAction.UpdateSuccessAction,
          AuthAction.UpdateLoadingAction,
          new AuthAction.RefreshTokenSuccessAction(value),
        ])
      ),
      catchError((error) =>
        ctx.dispatch([
          AuthAction.ResetBooleanField,
          new AuthAction.ActionOnAuthFailled(error.message, error.status),
          AuthAction.UpdateIsErrorAction,
          AuthAction.UpdateLoadingAction,
        ])
      )
    );
  }

  @Action(AuthAction.LoginSuccessAction)
  updateState(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.LoginSuccessAction
  ) {
    ctx.patchState({ data: payload });
  }

  @Action(AuthAction.LogOutAction)
  logOut(ctx: StateContext<AuthStateModel>) {
    ctx.patchState({
      data: {
        accessToken: '',
        refreshToken: '',
        tokenType: '',
        expiresIn: 0,
      },
      error: {},
      isError: false,
      isLoading: true,
      isSuccess: false,
      user: {},
    });
  }

  @Action(AuthAction.RefreshTokenSuccessAction)
  refreshTokenSuccess(
    ctx: StateContext<AuthStateModel>,
    { payload }: AuthAction.RefreshTokenSuccessAction
  ) {
    ctx.patchState({ data: payload });
  }

  @Action(AuthAction.ActionOnAuthFailled)
  handleError(
    ctx: StateContext<AuthStateModel>,
    { message, status }: AuthAction.ActionOnAuthFailled
  ) {
    ctx.patchState({
      error: {
        message,
        status,
      },
    });
  }

  @Action(AuthAction.UpdateLoadingAction)
  updateIsLoading(ctx: StateContext<AuthStateModel>) {
    ctx.setState((state) => ({ ...state, isLoading: !state.isLoading }));
  }

  @Action(AuthAction.UpdateSuccessAction)
  updateIsSuccess(ctx: StateContext<AuthStateModel>) {
    ctx.setState((state) => ({ ...state, isSuccess: !state.isSuccess }));
  }

  @Action(AuthAction.UpdateIsErrorAction)
  updateIsError(ctx: StateContext<AuthStateModel>) {
    ctx.setState((state) => ({ ...state, isError: !state.isError }));
  }

  @Selector()
  public static getAuthInfo(state: AuthStateModel) {
    return state.data;
  }

  @Selector()
  public static getAccessToken(state: AuthStateModel) {
    return state.data.accessToken;
  }

  @Selector()
  public static getRefreshToken(state: AuthStateModel) {
    return state.data.refreshToken;
  }

  @Selector()
  public static getError(state: AuthStateModel) {
    return state.error;
  }

  @Selector()
  public static isLoading(state: AuthStateModel) {
    return state.isLoading;
  }

  @Selector()
  public static isError(state: AuthStateModel) {
    return state.isError;
  }

  @Selector()
  public static isSuccess(state: AuthStateModel) {
    return state.isSuccess;
  }

  @Selector()
  public static getState(state: AuthStateModel) {
    return state;
  }

  @Selector()
  static isAuthenticate(state: AuthStateModel): boolean {
    return state.data.accessToken.length > 0 ? true : false;
  }

  @Selector()
  static getUser(state: AuthStateModel): User | undefined {
    return state.user;
  }
}
