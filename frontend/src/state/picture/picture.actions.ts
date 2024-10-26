import { Picture } from "../../interfaces";



export class LoadSuccessAction {

  static readonly type = '[Picture API] Load Pictures Success';
  constructor(public payload:Picture[]) { }

}

export class LoadPictureAction {

  static readonly type = '[Picture API] Load Pictures';
}

export class ResetBooleanField{
  static readonly type="[Picture State] Reset Boolean Fields";
}


export class ActionOnPictureFailled{

  static readonly type='[Picture API] Action On Pictures Failled';

  constructor(public message:string,public status:number){}
}


export class PostPictureAction{

  static readonly type="[Picture API] Add New Picture";

  constructor(public picture:FormData){
    console.log("AddPicture");
  }
}

export class LoadLastPostPictureAction{

  static readonly type="[Picture API] Load Last Post Picture";

  constructor(public id:number){}
}


export class PutPictureAction{

  static readonly type="[Picture API] Update Picture Identify By Id";

  constructor(public picture:FormData,public id:number){}
}


export class DeletePictureAction{

  static readonly type="[Picture API] Delete Picture Identify By Id";

  constructor(public id:number){}
}

export class UpdateLoadingAction{
  static readonly type="[Picture Page] Update IsLoading";
}

export class UpdateSuccessAction{

  static readonly type="[Picture Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  
  static readonly type="[Picture Page] Update IsError";
}
