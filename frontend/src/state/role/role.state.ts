import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { LoadSuccessAction,UpdateIsErrorAction,LoadRoleAction, ActionOnRoleFailled, PostRoleAction,DeleteRoleAction, UpdateLoadingAction, UpdateSuccessAction, ResetBooleanField } from './role.actions';
import { Role } from '../../interfaces';
import { RoleService } from '../../app/account/role/role.service';
import { catchError,mergeMap } from 'rxjs/operators';

export interface RoleStateModel {
    roles: Role[];
    error:{
      message?:string,
      status?:number
    };
    isSuccess:boolean;
    isError:boolean;
    isLoading:boolean;
}


@State<RoleStateModel>({
  name: 'role',
  defaults:{
    roles:[],
    error:{},
    isSuccess:false,
    isError:false,
    isLoading:true
  }
})
@Injectable()
export class RoleState {

  constructor(private readonly RoleService:RoleService){}

  @Action(LoadSuccessAction)
  loadRoleSuccess(ctx: StateContext<RoleStateModel>, { payload }: LoadSuccessAction) {
    ctx.patchState({roles:payload})
  }

  @Action(LoadRoleAction)
  loadRole(ctx: StateContext<RoleStateModel>){
    
    return this.RoleService.getAllRole().pipe(
      mergeMap(roles=>ctx.dispatch([new LoadSuccessAction(roles),UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnRoleFailled(error.message,error.status)])),
    );
  }

  @Action(ActionOnRoleFailled)
  handleError(ctx: StateContext<RoleStateModel>,{message,status}:ActionOnRoleFailled){
    
    ctx.patchState({error:{
      message,
      status
    }});
  }
  
  @Action(PostRoleAction)
  addNewRole(ctx:StateContext<RoleStateModel>,{payload}:PostRoleAction){

    return this.RoleService.addRole(payload).pipe(
      mergeMap(()=>ctx.dispatch([LoadRoleAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnRoleFailled(error.message,error.status)])),
      
    );
  }


  // @Action(PutRoleAction)
  // updateRole(ctx:StateContext<RoleStateModel>,{Role,id}:PutRoleAction){

  //   return this.RoleService.updateRole(id,Role).pipe(
  //     mergeMap(()=>ctx.dispatch([LoadRoleAction,UpdateSuccessAction,UpdateLoadingAction])),
  //     catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnRoleFailled(error.message,error.status)])),
      
  //   );
  // }

  @Action(DeleteRoleAction)
  deleteRole(ctx:StateContext<RoleStateModel>,{id}:DeleteRoleAction){
    return this.RoleService.deleteRole(id).pipe(

      mergeMap(()=>ctx.dispatch([LoadRoleAction,UpdateSuccessAction,UpdateLoadingAction])),
      catchError(error=>ctx.dispatch([UpdateIsErrorAction,UpdateLoadingAction,new ActionOnRoleFailled(error.message,error.status)])),
      
    )
  }

  @Action(UpdateLoadingAction)
  updateIsLoading(ctx:StateContext<RoleStateModel>){

    ctx.setState((state)=>({...state,isLoading:!state.isLoading}));
  }

  @Action(UpdateSuccessAction)
  updateIsSuccess(ctx:StateContext<RoleStateModel>){

    ctx.setState((state)=>({...state,isSuccess:!state.isSuccess}));
  }

  @Action(UpdateIsErrorAction)
  updateIsError(ctx:StateContext<RoleStateModel>){

    ctx.setState((state)=>({...state,isError:!state.isError}));
  }

  @Selector()
  static getError(state:RoleStateModel){
    return state.error;
  }


  @Selector()
  static getRoles(state:RoleStateModel){
    return state.roles;
  }
  @Selector()
  static IsLoading(state:RoleStateModel){
    return state.isLoading;
  }

  @Selector()
  static IsSuccess(state:RoleStateModel){
    return state.isSuccess;
  }

  @Selector()
  static IsError(state:RoleStateModel){
    return state.isError;
  }

  @Selector()
  static getState(state:RoleStateModel){
    return state;
  }

}
