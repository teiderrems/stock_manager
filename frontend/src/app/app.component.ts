import {
  afterRender,
  Component,
  inject,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LogoComponent } from './logo/logo.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { CapitalizePipe } from './capitalize.pipe';
import { ProfileComponent } from './profile/profile.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    NzIconModule,
    FooterComponent,
    NavBarComponent,
    NzDrawerModule,
    RouterLink,
    RouterLinkActive,
    LogoComponent,
    NzLayoutModule,
    NzBreadCrumbModule,
    CapitalizePipe,
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
    // afterRender({
    //   write:()=>{
    //     // this.titleService.setTitle('App component');
    //     // if (this.isAuthenticate()) {
    //     //   this.viewRef.createEmbeddedView(this.profile)
    //     // }
    //     // else{
    //     //   this.viewRef.createEmbeddedView(this.navbar)
    //     // }
    //     console.log(this.store);
    //   }
    // })
  }
}
