import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoadSuccessAction,UpdateIsErrorAction,LoadCommentAction, UpdateLoadingAction, UpdateSuccessAction, PostCommentAction, ActionOnCommentFailled, DeleteCommentAction, PutCommentAction } from './comment.actions';
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
    isLoading:true
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
  loadComment(ctx: StateContext<CommentStateModel>,{itemId}:LoadCommentAction){
    
    return this.commentService.getAllComment(itemId).pipe(

      mergeMap(Comments=>ctx.dispatch([new LoadSuccessAction(Comments),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status)])),
      
    );
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

    return this.commentService.addComment(comment,itemId).pipe(
      mergeMap(()=>ctx.dispatch([new LoadCommentAction(itemId),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status)])),
      
    );
  }


  // @Action(PutCommentAction)
  // updateComment(ctx:StateContext<CommentStateModel>,{comment,id,itemId}:PutCommentAction){

  //   return this.commentService.updateComment(id,itemId,comment).pipe(
  //     mergeMap(()=>ctx.dispatch([LoadCommentAction,UpdateSuccessAction,UpdateLoadingAction])),
  //     catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status)])),
      
  //   );
  // }

  @Action(DeleteCommentAction)
  deleteComment(ctx:StateContext<CommentStateModel>,{id,itemId}:DeleteCommentAction){
    return this.commentService.deleteComment(id,itemId).pipe(

      mergeMap(()=>ctx.dispatch([new LoadCommentAction(itemId),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnCommentFailled(error.message,error.status)])),
      
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
  static IsError(state:CommentStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:CommentStateModel){
    return state;
  }

}
