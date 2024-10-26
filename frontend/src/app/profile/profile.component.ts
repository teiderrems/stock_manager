import { Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Store } from '@ngxs/store';
import { AuthState } from '../../state/auth/auth.state';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgOptimizedImage,NzDropDownModule,NzButtonModule,RouterLink,
    RouterLinkActive,],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  private readonly store=inject(Store);
  isAuthenticate=this.store.selectSignal(AuthState.isAuthenticate);

}
