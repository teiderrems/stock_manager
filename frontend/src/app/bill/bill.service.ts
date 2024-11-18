import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';
import { Bill, BillResponseBody, ResponseBody } from '../../interfaces';
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

  addBill(bill:Partial<Bill>,userId:number):Observable<ResponseBody>{
    return this.http.post<ResponseBody>(this.constantService.getBaseUrl()+`users/${userId}/bills`,bill);
  }

  updateBill(id:number,userId:number,bill:Partial<Bill>):Observable<ResponseBody>{
    
    return this.http.put<ResponseBody>(this.constantService.getBaseUrl()+`users/${userId}/bills/${id}`,bill);
  }

  deleteBill(id:number,userId:number):Observable<ResponseBody>{
    return this.http.delete<ResponseBody>(this.constantService.getBaseUrl()+`users/${userId}/bills/${id}`);
  }
}
