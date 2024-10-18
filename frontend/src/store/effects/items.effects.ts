// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { exhaustMap, map, catchError, EMPTY, tap } from "rxjs";
// import { ItemService } from "../../app/item/item.service";

// import * as ItemsAction from '../actions/items.action';


// @Injectable()
// export class ItemEffects{

  
//   constructor(
//     private actions$: Actions,
//     private itemsService: ItemService
//   ) {}



//   loadItems$ = createEffect(() => this.actions$.pipe(
//       tap(val=>console.log(val)),
//       ofType(ItemsAction.ItemListAction),
//       exhaustMap(() => this.itemsService.getAllItem()
//         .pipe(
//           map(items => (ItemsAction.ItemsGetAction({payload:items}))),
//           catchError(() => EMPTY)
//         ))
//       )
//     );
// }

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { ItemService } from "../../app/item/item.service";
import ItemsAction from '../actions/items.action';

@Injectable()
export default class ItemsEffects {

  loadItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ItemsAction.loadItems),
      tap(val=>console.log(val)),
      exhaustMap((action) => this.moviesService.getAllItem()
        .pipe(
          map(items => (ItemsAction.loadItemsSuccess({items}))),
          catchError((error:any) => of(ItemsAction.catchFailledAction({ message: error.message, status: error.response.status??502}))) //of({ type: '[Movies API] Movies Loaded Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private moviesService: ItemService
  ) {}
}

// export const loadItems = createEffect(
//   (actions$ = inject(Actions), itemsService = inject(ItemService)) => {
//     return actions$.pipe(
//       ofType(ItemsAction.loadItems),
//       exhaustMap(() =>
//         itemsService.getAllItem().pipe(
//           map((items) => ItemsAction.loadItemsSuccess({ items })),
//           catchError((error: { message: string,status:number }) =>
//             of(ItemsAction.catchFailledAction({ message: error.message,status:error.status }))
//           )
//         )
//       )
//     );
//   },
//   { functional: true }
// );