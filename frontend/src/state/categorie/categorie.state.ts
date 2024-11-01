import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoadSuccessAction,UpdateIsErrorAction,LoadCategorieAction, ActionOnCategorieFailled, PostCategorieAction,PutCategorieAction,DeleteCategorieAction, UpdateLoadingAction, UpdateSuccessAction, ResetBooleanField } from './categorie.actions';
import { Categorie } from '../../interfaces';
import { CategorieService } from '../../app/categorie/categorie.service';
import { catchError,mergeMap } from 'rxjs/operators';

export interface CategorieStateModel {
    categories: Categorie[];
    error:{
      message?:string,
      status?:number
    };
    isSuccess:boolean;
    isError:boolean;
    isLoading:boolean;
}


@State<CategorieStateModel>({
  name: 'categorie',
  defaults:{
    categories:[],
    error:{},
    isSuccess:false,
    isError:false,
    isLoading:true
  }
})
@Injectable()
export class CategorieState {

  constructor(private readonly categorieService:CategorieService){}

  @Action(LoadSuccessAction)
  loadCategorieSuccess(ctx: StateContext<CategorieStateModel>, { payload }: LoadSuccessAction) {
    ctx.patchState({categories:payload})
  }

  @Action(LoadCategorieAction)
  loadCategorie(ctx: StateContext<CategorieStateModel>){
    
    return this.categorieService.getAllCategorie().pipe(
      mergeMap(Categories=>ctx.dispatch([new LoadSuccessAction(Categories),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCategorieFailled(error.message,error.status)])),
      
    );
  }

  @Action(ActionOnCategorieFailled)
  handleError(ctx: StateContext<CategorieStateModel>,{message,status}:ActionOnCategorieFailled){
    
    ctx.patchState({error:{
      message,
      status
    }});
  }
  
  @Action(PostCategorieAction)
  addNewCategorie(ctx:StateContext<CategorieStateModel>,{categorie}:PostCategorieAction){

    return this.categorieService.addCategorie(categorie).pipe(
      mergeMap(()=>ctx.dispatch([LoadCategorieAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCategorieFailled(error.message,error.status)])),
      
    );
  }


  @Action(PutCategorieAction)
  updateCategorie(ctx:StateContext<CategorieStateModel>,{Categorie,id}:PutCategorieAction){

    return this.categorieService.updateCategorie(id,Categorie).pipe(
      mergeMap(()=>ctx.dispatch([LoadCategorieAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCategorieFailled(error.message,error.status)])),
      
    );
  }

  @Action(DeleteCategorieAction)
  deleteCategorie(ctx:StateContext<CategorieStateModel>,{id}:DeleteCategorieAction){
    return this.categorieService.deleteCategorie(id).pipe(

      mergeMap(()=>ctx.dispatch([LoadCategorieAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCategorieFailled(error.message,error.status)])),
      
    )
  }

  @Action(UpdateLoadingAction)
  updateIsLoading(ctx:StateContext<CategorieStateModel>){

    ctx.setState((state)=>({...state,isLoading:!state.isLoading}));
  }

  @Action(UpdateSuccessAction)
  updateIsSuccess(ctx:StateContext<CategorieStateModel>){

    ctx.setState((state)=>({...state,isSuccess:!state.isSuccess}));
  }

  @Action(UpdateIsErrorAction)
  updateIsError(ctx:StateContext<CategorieStateModel>){

    ctx.setState((state)=>({...state,isError:!state.isError}));
  }

  @Selector()
  static getError(state:CategorieStateModel){
    return state.error;
  }


  @Selector()
  static getCategories(state:CategorieStateModel){
    return state.categories;
  }
  @Selector()
  static IsLoading(state:CategorieStateModel){
    return state.isLoading;
  }

  @Selector()
  static IsSuccess(state:CategorieStateModel){
    return state.isSuccess;
  }

  @Selector()
  static IsError(state:CategorieStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:CategorieStateModel){
    return state;
  }

}
