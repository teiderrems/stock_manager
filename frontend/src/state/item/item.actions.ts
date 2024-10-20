import { Item, ItemResponseBody } from "../../interfaces";



export class LoadSuccessAction {
  static readonly type = '[Item API] Load Items Success';
  constructor(public payload:ItemResponseBody) { }
}

export class LoadItemAction {
  static readonly type = '[Item API] Load Items';
}


export class ActionOnItemFailled{
  static readonly type='[Item API] Action On Items Failled';

  constructor(public message:string,public status:number){}
}


export class PostItemAction{
  static readonly type="[Item API] Add New Item";

  constructor(public item:Partial<Item>){}
}


export class PutItemAction{
  static readonly type="[Item API] Update Item Identify By Id";

  constructor(public item:Partial<Item>,public id:number){}
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
