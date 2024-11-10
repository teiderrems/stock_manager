import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthState } from '../../../state/auth/auth.state';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NzFormatBeforeDropEvent, NzFormatEmitEvent, NzTreeModule } from 'ng-zorro-antd/tree';



@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,NzIconModule,NzTreeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {



private readonly router=inject(Router);


handleClic($event: NzFormatEmitEvent) {
  switch ($event.node?.title) {
    case 'admin':
      this.router.navigateByUrl("/admin/users/admin");
      break;
    case 'guest':
      this.router.navigateByUrl("/admin/users/guest");
      break;
  
    default:
      this.router.navigateByUrl("/admin/users");
      break;
  }
}

 private readonly store=inject(Store);
 
 currentUser=this.store.selectSignal(AuthState.getUser);

 isAdmin=computed(()=>this.currentUser()?.roles?.includes("admin"));


 readonly nodes = [
  {
    title: 'Users',
    key: '1',
    expanded: false,
    icon:'team',
    children: [
      {
        title: 'admin',
        key: '2',
        icon:'user'
      },
      {
        title: 'guest',
        key: '3',
        icon:'user'
      }
    ],
  }
];

beforeDrop(arg: NzFormatBeforeDropEvent): Observable<boolean> {
  // if insert node into another node, wait 1s
  if (arg.pos === 0) {
    return of(true).pipe(delay(1000));
  } else {
    return of(false);
  }
}


}
