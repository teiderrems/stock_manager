import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';
import { Bill, BillResponseBody } from '../../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllBill(userId:number):Observable<BillResponseBody>{
    return this.http.get<BillResponseBody>(this.constantService.getBaseUrl()+`users/${userId}/bills`);
  }

  getBillById(id:number,userId:number):Observable<Bill>{
    return this.http.get<Bill>(this.constantService.getBaseUrl()+`users/${userId}/bills/${id}`)
  }

  addBill(bill:Partial<Bill>,userId:number):Observable<any>{
    return this.http.post(this.constantService.getBaseUrl()+`users/${userId}/bills`,bill);
  }

  updateBill(id:number,userId:number,bill:Partial<Bill>):Observable<any>{
    
    return this.http.put(this.constantService.getBaseUrl()+`users/${userId}/bills/${id}`,bill);
  }

  deleteBill(id:number,userId:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`users/${userId}/bills/${id}`);
  }
}
