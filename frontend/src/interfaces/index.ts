
export interface Categorie{

    id?:number;
    name?:string;
    description?:string;
}

export interface Comment{
    id?:number;
    title?:string;
    message?:string;
    item?:Item;
}

export interface Item{
    id?:number;
    name?:string;
    description?:string;
    imageUrl?:string[];
    createdAt?:Date;
    updatedAt?:Date;
    expirationDate?:Date;
    minPrice:number;
    maxPrice:number;
    ctockQuantity:number;

    categories?:Categorie[]
    comments?:Comment[]
}