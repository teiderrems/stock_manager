import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';
import { Observable } from 'rxjs';
import { CreateItem, Item, ItemResponseBody, ResponseBody, UpdateItem } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private readonly http:HttpClient,private readonly constantService:ConstantService) { }

  getAllItem(page:number,limit:number,categorie?:string):Observable<ItemResponseBody>{
    return this.http.get<ItemResponseBody>(this.constantService.getBaseUrl()+`items?page=${page}&limit=${limit}&categorie=${categorie}`);
  }

  getItemById(id:number):Observable<Item>{
    return this.http.get<Item>(this.constantService.getBaseUrl()+`items/${id}`)
  }

  addItem(item:CreateItem):Observable<ResponseBody>{
    return this.http.post<ResponseBody>(this.constantService.getBaseUrl()+'items',item);
  }

  updateItem(id:number,item:UpdateItem):Observable<ResponseBody>{

    return this.http.put<ResponseBody>(this.constantService.getBaseUrl()+`items/${id}`,item);
  }

  deleteItem(id:number):Observable<ResponseBody>{
    return this.http.delete<ResponseBody>(this.constantService.getBaseUrl()+`items/${id}`);
  }
}
