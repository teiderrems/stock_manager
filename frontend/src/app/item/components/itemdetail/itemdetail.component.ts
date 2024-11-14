import { Component, computed, inject, input, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
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
import { NgTemplateOutlet } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';



@Component({
  selector: 'app-itemdetail',
  standalone: true,
  imports: [NzButtonModule,NzToolTipModule,NzDividerModule,NzAvatarModule,NgTemplateOutlet,NzCollapseModule,NzImageModule,NzTagModule, NzButtonModule, NzIconModule, NzImageModule, NzTypographyModule, CommentComponent],
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

  authState=this.store.selectSignal(AuthState.getState);

  isAuthenticate=computed(()=>!!this.authState().data.accessToken);

  isAdminOrGuest=computed(()=>this.authState().user?.roles?.includes("admin") ||this.authState().user?.roles?.includes("guest"))

}
