import { Component, computed, inject, input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Item } from '../../../../interfaces';
import { NzImageModule } from 'ng-zorro-antd/image';
import { Store } from '@ngxs/store';
import { AuthState } from '../../../../state/auth/auth.state';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { CommentComponent } from "../../../comment/comment.component";
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { Router } from '@angular/router';
import { NzTagModule } from 'ng-zorro-antd/tag';


@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [NzCardModule,NzCollapseModule,NzTagModule, NzButtonModule, NzIconModule, NzImageModule, NzTypographyModule, CommentComponent],
  templateUrl: './itemdetail.component.html',
  styleUrl: './itemdetail.component.css'
})
export class ItemdetailComponent {
ShowComment() {
  this.router.navigateByUrl(`/items/${this.currentItem()!.id}/comments`);
}

  currentItem=input<Item>();

  public readonly router=inject(Router);

  showComments=signal(false);
  private store=inject(Store);

  accessToken=this.store.selectSignal(AuthState.getAccessToken);

  isAuthenticate=computed(()=>!!this.accessToken);

}
