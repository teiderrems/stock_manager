import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoadSuccessAction,UpdateIsErrorAction,LoadUserAction, ActionOnUserFailled, PostUserAction,PutUserAction,DeleteUserAction, UpdateLoadingAction, UpdateSuccessAction, FetchUserWhoAuthenticate, FetchUserSuccess, AuthenticateUser, AuthenticateUserSuccess, ResetBooleanField } from './user.actions';
import { User, UserResponseBody } from '../../interfaces';
import { catchError,exhaustMap,mergeMap } from 'rxjs/operators';
import { UserService } from '../../app/admin/user/user.service';

export interface UserStateModel {
    users: UserResponseBody;
    error:{
      message?:string,
      status?:number
    };
    isSuccess:boolean;
    isError:boolean;
    isLoading:boolean;
    user:User;
}


@State<UserStateModel>({
  name: 'user',
  defaults:{
    users:{
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
    user:{}
  }
})
@Injectable()
export class UserState {

  constructor(private readonly userService:UserService){}

  @Action(LoadSuccessAction)
  loadUserSuccess(ctx: StateContext<UserStateModel>, { payload }: LoadSuccessAction) {
    ctx.patchState({users:payload});
  }

  @Action(LoadUserAction)
  loadUser(ctx: StateContext<UserStateModel>){
    
    return this.userService.getAllUser().pipe(
      mergeMap(users=>ctx.dispatch([new LoadSuccessAction(users),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnUserFailled(error.message,error.status)])) 
    );
  }

  @Action(ActionOnUserFailled)
  handleError(ctx: StateContext<UserStateModel>,{message,status}:ActionOnUserFailled){
    
    ctx.patchState({error:{
      message,
      status
    }});
  }
  
  @Action(PostUserAction)
  addNewUser(ctx:StateContext<UserStateModel>,{user}:PostUserAction){

    return this.userService.addUser(user).pipe(
      mergeMap(()=>ctx.dispatch([LoadUserAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnUserFailled(error.message,error.status)]))
    );
  }


  @Action(PutUserAction)
  updateUser(ctx:StateContext<UserStateModel>,{user,id}:PutUserAction){

    return this.userService.updateUser(id,user).pipe(
      mergeMap(()=>ctx.dispatch([LoadUserAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnUserFailled(error.message,error.status)]))
    );
  }

  @Action(DeleteUserAction)
  deleteUser(ctx:StateContext<UserStateModel>,{id}:DeleteUserAction){
    return this.userService.deleteUser(id).pipe(

      mergeMap(()=>ctx.dispatch([LoadUserAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnUserFailled(error.message,error.status)]))
    )
  }

  @Action(FetchUserWhoAuthenticate)
  loadCurrentUser(ctx: StateContext<UserStateModel>,{username}:FetchUserWhoAuthenticate){
    return this.userService.getUserByUsername(username).pipe(
      mergeMap((value)=>ctx.dispatch([new FetchUserSuccess(value),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnUserFailled(error.message,error.status)]))
    )
  }

  @Action(FetchUserSuccess)
  fetchUserSuccess(ctx: StateContext<UserStateModel>,{user}:FetchUserSuccess){
    ctx.patchState({user});
  }

  @Action(UpdateLoadingAction)
  updateIsLoading(ctx:StateContext<UserStateModel>){

    ctx.setState((state)=>({...state,isLoading:!state.isLoading}));
  }

  @Action(UpdateSuccessAction)
  updateIsSuccess(ctx:StateContext<UserStateModel>){

    ctx.setState((state)=>({...state,isSuccess:!state.isSuccess}));
  }

  @Action(AuthenticateUser)
  getAuthenticateUser(ctx:StateContext<UserStateModel>,{username}:AuthenticateUser){
    return this.userService.getUserByUsername(username).pipe(
      exhaustMap(value=>ctx.dispatch([UpdateSuccessAction,UpdateLoadingAction,new AuthenticateUserSuccess(value)])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnUserFailled(error.message,error.status)]))
    );
  }

  @Action(UpdateIsErrorAction)
  updateIsError(ctx:StateContext<UserStateModel>){

    ctx.setState((state)=>({...state,isError:!state.isError}));
  }

  @Action(AuthenticateUserSuccess)
  updateCurrentUser(ctx:StateContext<UserStateModel>,{user}:AuthenticateUserSuccess){
    ctx.patchState({user});
  }

  @Action(ResetBooleanField)
  resetBooleanField(ctx:StateContext<UserStateModel>){
    ctx.patchState(
      {
      error:{},
      isSuccess:false,
      isError:false,
      isLoading:true
    });
  }

  @Selector()
  static getError(state:UserStateModel){
    return state.error;
  }


  @Selector()
  static getUsers(state:UserStateModel){
    return state.users.data;
  }
  @Selector()
  static IsLoading(state:UserStateModel){
    return state.isLoading;
  }

  @Selector()
  static IsSuccess(state:UserStateModel){
    return state.isSuccess;
  }

  @Selector()
  static IsError(state:UserStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:UserStateModel){
    return state;
  }

  @Selector()
  static getCurrentUser(state:UserStateModel){
    return state.user;
  }
}
