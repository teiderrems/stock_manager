import { Role } from "../../interfaces";



export class LoadSuccessAction {
  static readonly type = '[Role API] Load Roles Success';
  constructor(public payload:Role[]) { }
}

export class LoadRoleAction {
  static readonly type = '[Role API] Load Roles';
}


export class ActionOnRoleFailled{
  static readonly type='[Role API] Action On Roles Failled';

  constructor(public message:string,public status:number){}
}


export class PostRoleAction{
  static readonly type="[Role API] Add New Role";

  constructor(public payload:{name:string}){}
}

export class ResetBooleanField{
  static readonly type="[Role State] Reset Boolean Fields";
}


// export class PutRoleAction{
//   static readonly type="[Role API] Update Role Identify By Id";

//   constructor(public Role:Partial<Role>,public id:number){}
// }


export class DeleteRoleAction{
  static readonly type="[Role API] Delete Role Identify By Id";

  constructor(public id:number){}
}

export class UpdateLoadingAction{
  static readonly type="[Role Page] Update IsLoading";
}

export class UpdateSuccessAction{
  static readonly type="[Role Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  static readonly type="[Role Page] Update IsError";
}
