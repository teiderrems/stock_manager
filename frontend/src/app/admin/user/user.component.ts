import { afterRender, Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RoleComponent } from "../../account/role/role.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { Store } from '@ngxs/store';
import { UserState } from '../../../state/user/user.state';
import { DeleteUserAction, LoadUserAction, ResetBooleanField } from '../../../state/user/user.actions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { User } from '../../../interfaces';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, EMPTY, map, Observable } from 'rxjs';

import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NzIconModule,NzButtonModule,NzPopconfirmModule,NzPaginationModule,NzIconModule,NzSkeletonModule, NzButtonModule,NzListModule, RoleComponent, AddUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  delete(user:User){
    this.store.dispatch(ResetBooleanField);
    this.store.dispatch(new DeleteUserAction(user.id!));
  }

  
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(user:User): void {
    this.store.dispatch(ResetBooleanField);
    this.store.dispatch(new DeleteUserAction(user.id!)).pipe(
      map(value=>{
        this.nzMessageService.info(user.username + " was deletd successfully");
      }),
      catchError(error=>{
        this.nzMessageService.error(error.message);
        return EMPTY;
      })
    ).subscribe(v=>{
      console.log(v);
    });
    // if (this.userState().isSuccess) {
    //   this.nzMessageService.info('click confirm'+user.username);
    // }
  }

  beforeConfirm(): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 500);
    });
  }

  private nzMessageService=inject(NzMessageService);



  edit(user: User) {
    console.log(user);
  }
  ngOnInit(): void {
    this.store.dispatch(ResetBooleanField);
    this.store.dispatch(LoadUserAction);
  }

  updateLimit(size:number) {
    this.limit.set(size)
  
  }
  
    updatePage(index:number) {
      this.page.set(index);
    }
  
    page=signal(1);
    limit=signal(20);

  private readonly store=inject(Store);

  userState=this.store.selectSignal(UserState.getState);

  open=signal(false);
  hiddenModal() {
    this.open.set(false);
  }
  toggleModal() {
    this.open.set(true);
  }
}
