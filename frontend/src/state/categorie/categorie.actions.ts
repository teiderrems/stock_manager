import { Categorie, CreateCategorie } from "../../interfaces";



export class LoadSuccessAction {
  static readonly type = '[Categorie API] Load Categories Success';
  constructor(public payload:Categorie[]) { }
}

export class LoadCategorieAction {
  static readonly type = '[Categorie API] Load Categories';
}


export class ActionOnCategorieFailled{
  static readonly type='[Categorie API] Action On Categories Failled';

  constructor(public message:string,public status:number){}
}


export class PostCategorieAction{
  static readonly type="[Categorie API] Add New Categorie";

  constructor(public categorie:CreateCategorie){}
}


export class PutCategorieAction{
  static readonly type="[Categorie API] Update Categorie Identify By Id";

  constructor(public Categorie:Partial<Categorie>,public id:number){}
}


export class DeleteCategorieAction{
  static readonly type="[Categorie API] Delete Categorie Identify By Id";

  constructor(public id:number){}
}

export class UpdateLoadingAction{
  static readonly type="[Categorie Page] Update IsLoading";
}

export class UpdateSuccessAction{
  static readonly type="[Categorie Page] Update IsSuccess";
}

export class UpdateIsErrorAction{
  static readonly type="[Categorie Page] Update IsError";
}
