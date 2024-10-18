import { createReducer, on } from "@ngrx/store"
import * as CounterAction  from "../actions/counter.action"



export interface CounterState{
    count:number
}


export const initialState:CounterState={
    count:0
}



export const CounterReducer=createReducer(initialState,
    on(CounterAction.CounterIncrementAction,(state,{increment})=>({...state,count:state.count+increment})),
    on(CounterAction.CounterDecrementAction,(state)=>({...state,count:state.count-1})),
    on(CounterAction.CounterResetAction,(state)=>({...state,count:0})),
    on(CounterAction.CounterGetAction,state=>state),
)