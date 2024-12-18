import { Component, inject } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { LogOutAction } from '../../../state/auth/auth.actions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NzAvatarModule,NzDropDownModule,NzButtonModule,RouterLink,
    RouterLinkActive,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private readonly store=inject(Store);
  isAuthenticate=this.store.selectSignal(AuthState.isAuthenticate);
  currentUser=this.store.selectSignal(AuthState.getUser);
  private readonly router=inject(Router);

  logOut(){
    this.store.dispatch(LogOutAction);
    this.router.navigateByUrl("/login");
  }

}
