import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RoleComponent } from "../../account/role/role.component";
import { AddUserComponent } from "./components/add-user/add-user.component";
import { Store } from '@ngxs/store';
import { UserState } from '../../../state/user/user.state';
import { LoadUserAction } from '../../../state/user/user.actions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { User } from '../../../interfaces';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NzIconModule,NzButtonModule,NzPaginationModule,NzIconModule,NzSkeletonModule, NzButtonModule,NzListModule, RoleComponent, AddUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  delete(user:User){
    console.log(user);
  }

  edit(user: User) {
    console.log(user);
  }
  ngOnInit(): void {
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
