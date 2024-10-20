import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';
import { Observable } from 'rxjs';
import { Item, ItemResponseBody } from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private readonly http:HttpClient,private readonly constantService:ConstantService) { }

  getAllItem():Observable<ItemResponseBody>{
    return this.http.get<ItemResponseBody>(this.constantService.getBaseUrl()+'items');
  }

  getItemById(id:number):Observable<Item>{
    return this.http.get<Item>(this.constantService.getBaseUrl()+`items/${id}`)
  }

  addItem(item:Partial<Item>):Observable<any>{
    return this.http.post(this.constantService.getBaseUrl()+'items',item);
  }

  updateItem(id:number,item:Partial<Item>):Observable<any>{
    
    return this.http.put(this.constantService.getBaseUrl()+`items/${id}`,item);
  }

  deleteItem(id:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`items/${id}`);
  }
}
