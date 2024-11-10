import { Component, inject, OnInit, signal } from '@angular/core';
import { DeleteUserAction, LoadUserAction, ResetBooleanField } from '../../../../state/user/user.actions';
import { Store } from '@ngxs/store';
import { UserState } from '../../../../state/user/user.state';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, catchError, EMPTY, Observable } from 'rxjs';
import { User } from '../../../../interfaces';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NzIconModule,NzButtonModule,NzPopconfirmModule,NzPaginationModule,NzIconModule,NzSkeletonModule, NzButtonModule,NzListModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  

  
  cancel(): void {
    this.nzMessageService.info('click cancel');
  }

  confirm(user:User): void {
    this.store.dispatch(ResetBooleanField);
    this.store.dispatch(new DeleteUserAction(user.id!)).pipe(
      map(()=>{
        this.nzMessageService.info(user.username + " had be deleted successfully");
      }),
      catchError(error=>{
        this.nzMessageService.error(error.message);
        return EMPTY;
      })
    ).subscribe(v=>{
      console.log(v);
    });
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
    this.store.dispatch(new LoadUserAction(this.page(),this.limit(),"admin"));
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
}
