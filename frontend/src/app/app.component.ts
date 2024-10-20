import { Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
// import { Store } from '@ngrx/store';
// import { CounterIncrementAction } from '../store/actions/counter.action';
import { Observable } from 'rxjs';
import { Item } from '../interfaces';
// import ItemsAction from '../store/actions/items.action';
import { ItemService } from './item/item.service';
import { Store } from '@ngxs/store';
import { LoadItemAction } from '../state/item/item.actions';
import { ItemState } from '../state/item/item.state';
// import { ItemsSelector } from '../store/selectors/items.selector';

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
  

  ngOnInit(): void {
    
    this.getAllItems();
  }

  // loadItems(){
  //   this.store.dispatch(ItemsAction.loadItems())
  // }

  private readonly titleService:Title=inject(Title)
  // private readonly itemService:ItemService=inject(ItemService)


  getAllItems(){
    this.store.dispatch(LoadItemAction);
  }

  
  private readonly store=inject(Store);
  
  title = signal<string>('frontend');
  // constructor(private readonly store:Store){}

  public items$=this.store.selectSignal(ItemState.getItems);

}
