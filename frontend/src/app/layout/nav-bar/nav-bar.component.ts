import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthState } from '../../../state/auth/auth.state';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NzIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {

 private readonly store=inject(Store);
 
 currentUser=this.store.selectSignal(AuthState.getUser);

 isAdmin=computed(()=>this.currentUser()?.roles?.includes("admin"));



}
