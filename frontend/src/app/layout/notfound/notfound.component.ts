import { Component, inject, OnInit } from '@angular/core';
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
export class NotfoundComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.router.routerState);
  }


  router=inject(Router);
}
