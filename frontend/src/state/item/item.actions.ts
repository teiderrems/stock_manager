import { CreateItem, Item, ItemResponseBody, UpdateItem } from "../../interfaces";



export class LoadSuccessAction {
  static readonly type = '[Item API] Load Items Success';
  constructor(public payload:ItemResponseBody) { }
}

export class LoadItemAction {
  static readonly type = '[Item API] Load Items';
  constructor(public page:number,public limit:number){}
}


export class ActionOnItemFailled{
  static readonly type='[Item API] Action On Items Failled';

  constructor(public message:string,public status:number){}
}


export class PostItemAction{
  static readonly type="[Item API] Add New Item";

  constructor(public item:CreateItem){}
}


export class PutItemAction{
  static readonly type="[Item API] Update Item Identify By Id";

  constructor(public item:UpdateItem,public id:number){}
}


export class DeleteItemAction{
  static readonly type="[Item API] Delete Item Identify By Id";

  constructor(public id:number){}
}

export class UpdateLoadingAction{
  static readonly type="[Item Page] Update IsLoading";
}

export class UpdateSuccessAction{
  static readonly type="[Item Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  static readonly type="[Item Page] Update IsError";
}

export class ResetBooleanField{
  static readonly type="[Item State] Reset Boolean Fields";
}
