import { Comment, CommentResponseBody, CreateComment } from "../../interfaces";



export class LoadSuccessAction {
  static readonly type = '[Comment API] Load Comments Success';
  constructor(public payload:CommentResponseBody) { }
}

export class LoadCommentAction {
  static readonly type = '[Comment API] Load Comments';
  constructor(public itemId:number,public page?:number,public limit?:number){}
}


export class ActionOnCommentFailled{
  static readonly type='[Comment API] Action On Comments Failled';

  constructor(public message:string,public status:number){}
}

export class ResetBooleanField{
  static readonly type="[Comment State] Reset Boolean Fields";
}


export class PostCommentAction{
  static readonly type="[Comment API] Add New Comment";

  constructor(public comment:CreateComment,public itemId:number){}
}



export class DeleteCommentAction{
  static readonly type="[Comment API] Delete Comment Identify By Id";

  constructor(public id:number,public itemId:number){}
}

export class UpdateLoadingAction{
  static readonly type="[Comment Page] Update IsLoading";
}

export class UpdateFetchingAction{
  static readonly type="[Comment Page] Update IsFetch";
}

export class UpdateSuccessAction{
  static readonly type="[Comment Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  static readonly type="[Comment Page] Update IsError";
}
