import { createAction,props } from "@ngrx/store";

export const CounterIncrementAction=createAction(
    '[Couter Page] Increment',
    props<{increment:number}>()
);
export const CounterDecrementAction=createAction(
    '[Couter Page] Decrement'
);

export const CounterResetAction=createAction(
    '[Couter Page] Decrement'
);

export const CounterGetAction=createAction(
    '[Couter Page] Display'
);

