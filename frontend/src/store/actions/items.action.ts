import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Item } from "../../interfaces";


const ItemsAction=createActionGroup(
    {
        source: "Item Page",
        events:{
            "Load Items":emptyProps(),
            "Load Items Success":props<{items:Item[]}>(),
            "Load Item By Id":props<{id:number}>(),
            "Load Item By Id Success":props<{item:Item}>(),
            "Post Item":props<{item:Partial<Item>}>(),
            "Put Item Identify By Id":props<{id:number,item:Partial<Item>}>(),
            "Delete Item Identify By Id":props<{id:number}>(),
            "Catch Failled Action":props<{message?:string,status?:number}>()
        }
    }
);

export default ItemsAction;


