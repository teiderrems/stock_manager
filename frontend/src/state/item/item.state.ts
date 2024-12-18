import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  LoadSuccessAction,
  UpdateIsErrorAction,
  LoadItemAction,
  ActionOnItemFailled,
  PostItemAction,
  PutItemAction,
  DeleteItemAction,
  UpdateLoadingAction,
  UpdateSuccessAction,
  ResetBooleanField,
  UpdateIsFetchAction
} from './item.actions';
import { ItemResponseBody } from '../../interfaces';
import { ItemService } from '../../app/item/item.service';
import { catchError,mergeMap } from 'rxjs/operators';

export interface ItemStateModel {
    items: ItemResponseBody;
    error:{
      message?:string,
      status?:number
    };
    isSuccess:boolean;
    isError:boolean;
    isLoading:boolean;
    isFetch:boolean;
}


@State<ItemStateModel>({
  name: 'item',
  defaults:{
    items:{
      data:[],
      pageSize:0,
      totalCount:0,
      hasNext:false,
      hasPrevious:false
    },
    error:{},
    isSuccess:false,
    isError:false,
    isLoading:true,
    isFetch:false
  }
})
@Injectable()
export class ItemState {

  constructor(private readonly itemService:ItemService){}

  @Action(LoadSuccessAction)
  loadItemSuccess(ctx: StateContext<ItemStateModel>, { payload }: LoadSuccessAction) {
    ctx.patchState({items:payload})
  }

  @Action(LoadItemAction)
  loadItem(ctx: StateContext<ItemStateModel>,{page,limit,categorie}:LoadItemAction){
    ctx.patchState({isFetch:true});
    return this.itemService.getAllItem(page,limit,categorie).pipe(
      mergeMap(items=>ctx.dispatch([new LoadSuccessAction(items),UpdateSuccessAction,UpdateLoadingAction,UpdateIsFetchAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnItemFailled(error.message,error.status),UpdateIsFetchAction])),
    );
  }

  @Action(ActionOnItemFailled)
  handleError(ctx: StateContext<ItemStateModel>,{message,status}:ActionOnItemFailled){

    ctx.patchState({error:{
      message,
      status
    }});
  }

  @Action(PostItemAction)
  addNewItem(ctx:StateContext<ItemStateModel>,{item}:PostItemAction){
    ctx.patchState({isFetch:true});
    return this.itemService.addItem(item).pipe(
      mergeMap(()=>ctx.dispatch([LoadItemAction,UpdateSuccessAction,UpdateLoadingAction,UpdateIsFetchAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnItemFailled(error.message,error.status),UpdateIsFetchAction])),

    );
  }


  @Action(PutItemAction)
  updateItem(ctx:StateContext<ItemStateModel>,{item,id}:PutItemAction){
    ctx.patchState({isFetch:true});
    return this.itemService.updateItem(id,item).pipe(
      mergeMap(()=>ctx.dispatch([LoadItemAction,UpdateSuccessAction,UpdateLoadingAction,UpdateIsFetchAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnItemFailled(error.message,error.status),UpdateIsFetchAction])),
    );
  }

  @Action(ResetBooleanField)
  resetBooleanField(ctx:StateContext<ItemStateModel>){
    ctx.patchState({
      isFetch:false,
      isError:false,
      isLoading:true,
      isSuccess:false
    });
  }

  @Action(DeleteItemAction)
  deleteItem(ctx:StateContext<ItemStateModel>,{id}:DeleteItemAction){
    ctx.patchState({isFetch:true});
    return this.itemService.deleteItem(id).pipe(

      mergeMap(()=>ctx.dispatch([LoadItemAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnItemFailled(error.message,error.status)])),

    )
  }

  @Action(UpdateLoadingAction)
  updateIsLoading(ctx:StateContext<ItemStateModel>){

    ctx.setState((state)=>({...state,isLoading:!state.isLoading}));
  }

  @Action(UpdateSuccessAction)
  updateIsSuccess(ctx:StateContext<ItemStateModel>){

    ctx.setState((state)=>({...state,isSuccess:!state.isSuccess}));
  }

  @Action(UpdateIsErrorAction)
  updateIsError(ctx:StateContext<ItemStateModel>){

    ctx.setState((state)=>({...state,isError:!state.isError}));
  }

  @Action(UpdateIsFetchAction)
  updateIsFetch(ctx:StateContext<ItemStateModel>){
    ctx.patchState({isFetch:false});
  }

  @Selector()
  static getError(state:ItemStateModel){
    return state.error;
  }


  @Selector()
  static getItems(state:ItemStateModel){
    return state.items;
  }
  @Selector()
  static IsLoading(state:ItemStateModel){
    return state.isLoading;
  }

  @Selector()
  static IsSuccess(state:ItemStateModel){
    return state.isSuccess;
  }

  @Selector()
  static IsError(state:ItemStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:ItemStateModel){
    return state;
  }

}
