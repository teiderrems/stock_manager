import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzResultModule } from 'ng-zorro-antd/result';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [NzResultModule,NzButtonModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {


  router=inject(Router);
}
