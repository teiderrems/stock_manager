import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { Store } from '@ngrx/store';
// import { CounterIncrementAction } from '../store/actions/counter.action';
import { Observable } from 'rxjs';
import { Item } from '../interfaces';
import ItemsAction from '../store/actions/items.action';
import { ItemService } from './item/item.service';
import { ItemsSelector } from '../store/selectors/items.selector';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatTabsModule, HeaderComponent, 
    FooterComponent, NavBarComponent,RouterLink, RouterLinkActive,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  // items$:Observable=this
  public items=signal<Item[]>([]);

  ngOnInit(): void {
    
    this.itemService.getAllItem().subscribe(val=>{
      this.items.set(val);
      console.log(val);
    })

  }

  loadItems(){
    this.store.dispatch(ItemsAction.loadItems())
  }

  private readonly titleService:Title=inject(Title)
  private readonly itemService:ItemService=inject(ItemService)

  
  
  private readonly store=inject(Store);

  item$:Observable<Item[] | undefined>=this.store.select(ItemsSelector);
  
  title = signal<string>('frontend');
  constructor(){
    // this.items=this.store.select<Item[]>(state=>state.items.items);
    // this.items.subscribe(value=>console.log(value));
    this.item$.subscribe(val=>console.log(val));
  }

}
