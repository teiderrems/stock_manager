import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import {
  LoadSuccessAction,
  UpdateIsErrorAction,
  LoadCommentAction,
  UpdateLoadingAction,
  UpdateSuccessAction,
  PostCommentAction,
  ActionOnCommentFailled,
  DeleteCommentAction,
  ResetBooleanField,
  UpdateFetchingAction
} from './comment.actions';
import { CommentResponseBody } from '../../interfaces';
import { catchError,mergeMap } from 'rxjs/operators';
import { CommentService } from '../../app/comment/comment.service';

export interface CommentStateModel {
    comments: CommentResponseBody;
    error:{
      message?:string,
      status?:number
    };
    isSuccess:boolean;
    isError:boolean;
    isLoading:boolean;
    isFetch:boolean;
}


@State<CommentStateModel>({
  name: 'comment',
  defaults:{
    comments:{
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
export class CommentState {

  constructor(private readonly commentService:CommentService){}

  @Action(LoadSuccessAction)
  loadCommentSuccess(ctx: StateContext<CommentStateModel>, { payload }: LoadSuccessAction) {
    ctx.patchState({comments:payload})
  }

  @Action(LoadCommentAction)
  loadComment(ctx: StateContext<CommentStateModel>,{itemId,page,limit}:LoadCommentAction){
    ctx.patchState({isFetch:true});
    return this.commentService.getAllComment(itemId,page,limit).pipe(

      mergeMap(Comments=>ctx.dispatch([new LoadSuccessAction(Comments),UpdateSuccessAction,UpdateLoadingAction,UpdateFetchingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status),UpdateFetchingAction])),

    );
  }

  @Action(ResetBooleanField)
  resetBooleanField(ctx:StateContext<CommentStateModel>){
    ctx.patchState({
      isSuccess:false,
      isError:false,
      isLoading:true,
      isFetch:false,
    })
  }

  @Action(ActionOnCommentFailled)
  handleError(ctx: StateContext<CommentStateModel>,{message,status}:ActionOnCommentFailled){

    ctx.patchState({error:{
      message,
      status
    }});
  }

  @Action(PostCommentAction)
  addNewComment(ctx:StateContext<CommentStateModel>,{itemId,comment}:PostCommentAction){
    ctx.patchState({isFetch:true});
    return this.commentService.addComment(comment,itemId).pipe(
      mergeMap(()=>ctx.dispatch([new LoadCommentAction(itemId),UpdateSuccessAction,UpdateLoadingAction,UpdateFetchingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status),UpdateFetchingAction])),

    );
  }


  @Action(DeleteCommentAction)
  deleteComment(ctx:StateContext<CommentStateModel>,{id,itemId}:DeleteCommentAction){

    ctx.patchState({isFetch:true});
    return this.commentService.deleteComment(id,itemId).pipe(

      mergeMap(()=>ctx.dispatch([new LoadCommentAction(itemId),UpdateSuccessAction,UpdateFetchingAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status),UpdateFetchingAction])),

    )
  }

  @Action(UpdateLoadingAction)
  updateIsLoading(ctx:StateContext<CommentStateModel>){

    ctx.setState((state)=>({...state,isLoading:!state.isLoading}));
  }

  @Action(UpdateSuccessAction)
  updateIsSuccess(ctx:StateContext<CommentStateModel>){

    ctx.setState((state)=>({...state,isSuccess:!state.isSuccess}));
  }

  @Action(UpdateFetchingAction)
  updateIsFetch(ctx:StateContext<CommentStateModel>){
    ctx.patchState({isFetch:false});
  }

  @Action(UpdateIsErrorAction)
  updateIsError(ctx:StateContext<CommentStateModel>){

    ctx.setState((state)=>({...state,isError:!state.isError}));
  }

  @Selector()
  static getError(state:CommentStateModel){
    return state.error;
  }


  @Selector()
  static getComments(state:CommentStateModel){
    return state.comments;
  }
  @Selector()
  static IsLoading(state:CommentStateModel){
    return state.isLoading;
  }

  @Selector()
  static IsSuccess(state:CommentStateModel){
    return state.isSuccess;
  }

  @Selector()
  static IsFetching(state:CommentStateModel){
    return state.isFetch;
  }

  @Selector()
  static IsError(state:CommentStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:CommentStateModel){
    return state;
  }

}
