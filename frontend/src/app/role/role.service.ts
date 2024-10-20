import { Injectable } from '@angular/core';
import { Role, RoleResponseBody } from '../../interfaces';
import { Observable } from 'rxjs';
import { ConstantService } from '../constant.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllRole():Observable<RoleResponseBody>{
    return this.http.get<RoleResponseBody>(this.constantService.getBaseUrl()+'roles');
  }

  getRoleById(id:number):Observable<Role>{
    return this.http.get<Role>(this.constantService.getBaseUrl()+`roles/${id}`)
  }

  addRole(Role:Partial<Role>):Observable<any>{
    return this.http.post(this.constantService.getBaseUrl()+'roles',Role);
  }

  updateRole(id:number,Role:Partial<Role>):Observable<any>{
    
    return this.http.put(this.constantService.getBaseUrl()+`roles/${id}`,Role);
  }

  deleteRole(id:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`roles/${id}`);
  }
}
