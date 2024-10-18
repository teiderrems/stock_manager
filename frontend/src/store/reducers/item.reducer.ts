import { createReducer,on } from "@ngrx/store";
import { Item } from "../../interfaces";

import ItemsAction from '../actions/items.action';


 

 export interface State{
    items:{
      items?:Item[];
      selectedItem?:Item;
    };
    loading:boolean;
    isSuccess:boolean;
    error:{
      message?:string,
      status?:number
    }
 }


 const initialState:State={
    items:{
      items:[]
    },
    loading:true,
    isSuccess:false,
    error:{}
 }


 export const ItemReducer=createReducer(
    initialState,
    // on(ItemsAction.loadItems,(state)=>({...state,loading:false,isSuccess:true})),
    on(ItemsAction.loadItemsSuccess,(state,{items})=>({...state,items:{
      items:items
    }})),
    on(ItemsAction.catchFailledAction,(state,action)=>({...state,error:{
      message:action.message,
      status:action.status
    }}))
   //  on(ItemsAction.loadItemById
 )