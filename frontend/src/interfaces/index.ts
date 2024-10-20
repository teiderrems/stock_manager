
export interface Categorie{

    id?:number;
    name?:string;
    description?:string;
}

export interface Comment{
    id?:number;
    title?:string;
    message?:string;
}

export interface Login{
    email:string;
    password:string;
    twoFactorCode?:string;
    twoFactorRecoveryCode?:string
}

export interface Register{
    email:string;
    password:string;
}

export interface ResetPassword{
    email:string;
    resetCode:string;
    newPassword:string;
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


export interface User{
    id:number;
    username:string;
    firstname?:string;
    lastname?:string;
    email?:string;
    profile?:string;
    createdAt?:Date;
    updatedAt?:Date;
    roles?:string[];
    phoneNumber?:string;
}


export interface Bill{
    id?:number;
    items?:string[]
    title?:string;
    status?:number;
    owner?:string;
    pdfUrl:string;
    totalAmount?:number;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface ItemResponseBody{
    data:Item[];
    pageSize:number;
    totalCount:number;
    hasNext:boolean;
    hasPrevious:boolean
}

export interface BillResponseBody{
    data:Bill[];
    pageSize:number;
    totalCount:number;
    hasNext:boolean;
    hasPrevious:boolean
}

export interface Role{
    id?:number;
    name?:string;
}

export interface Picture{
    id?:number;
    imageUrl?:string;
    createdAt?:Date;
    updatedAt?:Date;
}

export interface CommentResponseBody{
    data:Comment[];
    pageSize:number;
    totalCount:number;
    hasNext:boolean;
    hasPrevious:boolean
}


export interface LoginResponseBody{
    accessToken:string;
    refreshToken:string;
    tokenType:string;
    expiresIn:number;
}


export interface UserResponseBody{
    data:User[];
    pageSize:number;
    totalCount:number;
    hasNext:boolean;
    hasPrevious:boolean
}

export interface CategorieResponseBody{
    data:Categorie[]
}

export interface RoleResponseBody{
    data:Role[]
}

export interface PictureResponseBody{
    data:Picture[]
}


export interface CreateUser{
    Username:string;
    Firstname?:string;
    Lastname?:string;
    Email?:string;
    PhoneNumber:string;
    PictureId:number;
}

export interface UpdateUser{
    Id:number;
    Username:string;
    Firstname?:string;
    Lastname?:string;
    Email?:string;
    PhoneNumber:string;
    PictureId:number;
}

export interface CreateItem{
    Name:string;
    Description?:string;
    Categories:string[];
    ExpirationAt:Date;
    Pictures:string[];
    StockQuantity:number;
    MinPrice:number;
    Price:number;
    MaxPrice:number;
}

export interface UpdateItem{
    Id:number;
    Description?:string;
    StockQuantity:number;
    MinPrice:number;
    Price:number;
    MaxPrice:number;
}
