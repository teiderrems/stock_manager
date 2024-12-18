import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileComponent } from '../../account/profile/profile.component';




@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ProfileComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  public constructor(private readonly titleService:Title){}
  ngOnInit(): void {
    this.title=this.titleService.getTitle();
  }
  
  title="Header";

}
