import { Injectable } from '@angular/core';
import { Role } from '../../../interfaces';
import { Observable } from 'rxjs';
import { ConstantService } from '../../constant.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllRole():Observable<Role[]>{
    return this.http.get<Role[]>(this.constantService.getBaseUrl()+'roles');
  }

  getRoleById(id:number):Observable<Role>{
    return this.http.get<Role>(this.constantService.getBaseUrl()+`roles/${id}`)
  }

  addRole(role:{name:string}):Observable<any>{
    
    return this.http.post(this.constantService.getBaseUrl()+'roles',role);
  }


  deleteRole(id:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`roles/${id}`);
  }
}
