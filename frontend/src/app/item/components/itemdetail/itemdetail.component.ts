import { Component, computed, inject, input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Item } from '../../../../interfaces';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../../state/auth/auth.state';

@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [NzCardModule,NzButtonModule,NzIconModule,NzImageModule],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.css'
})
export class ItemdetailComponent {

  currentItem=input<Item>();

  private store=inject(Store);

  accessToken=this.store.selectSignal(AuthState.getAccessToken);

  isAuthenticate=computed(()=>!!this.accessToken);

}
