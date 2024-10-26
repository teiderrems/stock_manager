import {
  Component,
  ChangeDetectionStrategy,
  inject,
  OnInit,
  signal,
  EventEmitter,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { ItemState } from '../../state/item/item.state';
import { LoadItemAction } from '../../state/item/item.actions';
import { AddItemComponent } from './components/add-item/add-item.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ItemdetailComponent } from "./components/itemdetail/itemdetail.component";
import { NzPaginationModule } from 'ng-zorro-antd/pagination';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [AddItemComponent, NzIconModule, ItemdetailComponent,NzPaginationModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent implements OnInit {

updateLimit(size:number) {
  this.limit.set(size)

}

  updatePage(index:number) {
    this.page.set(index);
  }

  page=signal(1);
  limit=signal(20);

  hiddenModal() {
    this.open.set(false);
  }
  toggleModal() {
    this.open.set(true);
  }
  constructor(private readonly titleService: Title) {}

  private readonly store = inject(Store);

  open = signal<boolean>(false);

  public items = this.store.selectSignal(ItemState.getItems);

  ngOnInit(): void {
    this.titleService.setTitle('Items List');
    this.loadItems();
  }

  loadItems() {
    this.store.dispatch(new LoadItemAction(this.page(),this.limit()));
  }
}
