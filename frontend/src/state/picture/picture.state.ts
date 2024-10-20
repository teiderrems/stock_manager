import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoadSuccessAction,UpdateIsErrorAction,LoadPictureAction, ActionOnPictureFailled, PostPictureAction,PutPictureAction,DeletePictureAction, UpdateLoadingAction, UpdateSuccessAction } from './picture.actions';
import { Picture } from '../../interfaces';
import { PictureService } from '../../app/picture/picture.service';
import { catchError,mergeMap } from 'rxjs/operators';

export interface PictureStateModel {

    pictures: Picture[];
    error:{
      message?:string,
      status?:number
    };
    isSuccess:boolean;
    isError:boolean;
    isLoading:boolean;
}


@State<PictureStateModel>({

  name: 'picture',
  defaults:{
    pictures:[],
    error:{},
    isSuccess:false,
    isError:false,
    isLoading:true
  }
})
@Injectable()
export class PictureState {

  constructor(private readonly pictureService:PictureService){}

  @Action(LoadSuccessAction)
  loadPictureSuccess(ctx: StateContext<PictureStateModel>, { payload }: LoadSuccessAction) {
    ctx.patchState({pictures:payload})
  }

  @Action(LoadPictureAction)
  loadPicture(ctx: StateContext<PictureStateModel>){
    
    return this.pictureService.getAllPicture().pipe(
      mergeMap(pictures=>ctx.dispatch([new LoadSuccessAction(pictures),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnPictureFailled(error.message,error.status)])),
      
    );
  }

  @Action(ActionOnPictureFailled)
  handleError(ctx: StateContext<PictureStateModel>,{message,status}:ActionOnPictureFailled){
    
    ctx.patchState({error:{
      message,
      status
    }});
  }
  
  @Action(PostPictureAction)
  addNewPicture(ctx:StateContext<PictureStateModel>,{picture}:PostPictureAction){

    return this.pictureService.addPicture(picture).pipe(
      mergeMap(()=>ctx.dispatch([LoadPictureAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnPictureFailled(error.message,error.status)])),
      
    );
  }


  @Action(PutPictureAction)
  updatePicture(ctx:StateContext<PictureStateModel>,{picture,id}:PutPictureAction){

    return this.pictureService.updatePicture(id,picture).pipe(
      mergeMap(()=>ctx.dispatch([LoadPictureAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnPictureFailled(error.message,error.status)])),
      
    );
  }

  @Action(DeletePictureAction)
  deletePicture(ctx:StateContext<PictureStateModel>,{id}:DeletePictureAction){
    
    return this.pictureService.deletePicture(id).pipe(

      mergeMap(()=>ctx.dispatch([LoadPictureAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnPictureFailled(error.message,error.status)])),
      
    )
  }

  @Action(UpdateLoadingAction)
  updateIsLoading(ctx:StateContext<PictureStateModel>){

    ctx.setState((state)=>({...state,isLoading:!state.isLoading}));
  }

  @Action(UpdateSuccessAction)
  updateIsSuccess(ctx:StateContext<PictureStateModel>){

    ctx.setState((state)=>({...state,isSuccess:!state.isSuccess}));
  }

  @Action(UpdateIsErrorAction)
  updateIsError(ctx:StateContext<PictureStateModel>){

    ctx.setState((state)=>({...state,isError:!state.isError}));
  }

  @Selector()
  static getError(state:PictureStateModel){
    return state.error;
  }


  @Selector()
  static getPictures(state:PictureStateModel){
    return state.pictures;
  }
  @Selector()
  static IsLoading(state:PictureStateModel){
    return state.isLoading;
  }

  @Selector()
  static IsSuccess(state:PictureStateModel){
    return state.isSuccess;
  }

  @Selector()
  static IsError(state:PictureStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:PictureStateModel){
    return state;
  }

}
