import { CreateUser, UpdateUser, User, UserResponseBody } from "../../interfaces";



export class LoadSuccessAction {
  static readonly type = '[User API] Load Users Success';
  constructor(public payload:UserResponseBody) { }
}

export class LoadUserAction {
  static readonly type = '[User API] Load Users';
  constructor(public  page?:number,public  limit?:number,public role?:string) {}
}


export class ActionOnUserFailled{
  static readonly type='[User API] Action On Users Failled';

  constructor(public message:string,public status:number){}
}


export class PostUserAction{
  static readonly type="[User API] Add New User";

  constructor(public user:CreateUser){}
}


export class PutUserAction{
  static readonly type="[User API] Update User Identify By Id";

  constructor(public user:UpdateUser,public id:number){}
}


export class DeleteUserAction{
  static readonly type="[User API] Delete User Identify By Id";

  constructor(public id:number){}
}

export class UpdateLoadingAction{
  static readonly type="[User Page] Update IsLoading";
}

export class UpdateSuccessAction{
  static readonly type="[User Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  static readonly type="[User Page] Update IsError";
}

export class UpdateIsFetchAction{
  static readonly type="[User Page] Update IsFetch";
}

export class FetchUserWhoAuthenticate{
  static readonly type="[CurrentUser API] Fetch User Who Is Authenticate";
  constructor(public username:string){}
}

export class FetchUserSuccess{
  static readonly type="[User Page] Fetch User Success";
  constructor(public user:User){}
}

export class AuthenticateUserSuccess{
  static readonly type="[User API] Update CurrentUser";
  constructor(public user:User){}
}

export class AuthenticateUser{

  static readonly type="[User API] Fetch Authenticate User";
  constructor(public username:string){}
}

export class ResetBooleanField{
  static readonly type="[User State] Reset Boolean Fields";
}
