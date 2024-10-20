import { Login, LoginResponseBody, RefreshToken, Register, ResetPassword } from "../../interfaces";

export class LoginAction {

  static readonly type = '[Login API] Authenticate User';
  constructor(public payload: Login) { }
  
}


export class LoginSuccessAction {

  static readonly type = '[Login API] Authentication Success';
  constructor(public payload: LoginResponseBody) { }

}

export class RefreshTokenAction {

  static readonly type = '[Refresh API] Auto-Re-Authenticate User';
  constructor(public payload:RefreshToken) { }
  
}


export class RefreshTokenSuccessAction {

  static readonly type = '[Login API] Auto-Re-Authentication Success';
  constructor(public payload: LoginResponseBody) { }

}


export class RegisterAction {

  static readonly type = '[Register API] Add User';
  constructor(public payload: Register) { }

}


export class ActionOnAuthFailled{
  static readonly type='[Auth API] Action On Auth Failled';

  constructor(public message:string,public status:number){}
}
export class UpdateLoadingAction{
  static readonly type="[Auth Page] Update IsLoading";
}

export class UpdateSuccessAction{
  static readonly type="[Auth Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  static readonly type="[Auth Page] Update IsError";
}

export class ResetPasswordAction{
  static readonly type="[ResetPassword Page] Update Password";

  constructor(public payload:ResetPassword){}
}

export class ForgotPasswordAction{
  static readonly type="[ForgotPassword Page] Reset Password";

  constructor(public payload:string){}
}
