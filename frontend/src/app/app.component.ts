import {
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  RouterOutlet,
} from '@angular/router';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { LogoComponent } from './layout/logo/logo.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { ProfileComponent } from './account/profile/profile.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NzIconModule,
    NavBarComponent,
    NzDrawerModule,
    LogoComponent,
    NzLayoutModule,
    NzBreadCrumbModule,
    ProfileComponent,
    NzButtonModule,
    NzSwitchModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  visible: boolean = false;
  
  switchValue = false;
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  ngOnInit(): void {
    this.titleService.setTitle('App component');
  }

  isCollapsed = false;
  private readonly titleService: Title = inject(Title);
  public readonly router = inject(Router);

  title = signal<string>('frontend');

  constructor(){
  }
}
