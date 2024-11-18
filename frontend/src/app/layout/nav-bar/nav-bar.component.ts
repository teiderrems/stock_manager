import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthState } from '../../../state/auth/auth.state';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NzIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {



private readonly router=inject(Router);

 private readonly store=inject(Store);
 
 currentUser=this.store.selectSignal(AuthState.getUser);

 isAdmin=computed(()=>this.currentUser()?.roles?.includes("admin"));

}
