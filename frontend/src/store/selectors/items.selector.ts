import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Item } from "../../interfaces";
import { State } from "../reducers/item.reducer";


const itemFeature=createFeatureSelector<any>("items");

 export const ItemsSelector=createSelector(itemFeature,(state:State)=>(state.items.items));