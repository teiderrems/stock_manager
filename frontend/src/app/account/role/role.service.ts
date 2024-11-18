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

  addRole(role:{name:string}):Observable<{
    succeeded:boolean,
    error:any[]
  }>{
    
    return this.http.post<{
      succeeded:boolean,
      error:any[]
    }>(this.constantService.getBaseUrl()+'roles',role);
  }


  deleteRole(id:number):Observable<{
    succeeded:boolean,
    error:any[]
  }>{
    return this.http.delete<{
      succeeded:boolean,
      error:any[]
    }>(this.constantService.getBaseUrl()+`roles/${id}`);
  }
}
