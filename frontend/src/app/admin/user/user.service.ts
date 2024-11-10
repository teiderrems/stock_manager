import { Injectable } from '@angular/core';
import { ConstantService } from '../../constant.service';
import { HttpClient } from '@angular/common/http';
import { CreateUser, UpdateUser, User, UserResponseBody } from '../../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllUser(page?:number,limit?:number,role?:string):Observable<UserResponseBody>{
    
    return this.http.get<UserResponseBody>(this.constantService.getBaseUrl()+`users?page=${page}&limit=${limit}${role?`&role=${role}`:''}`);
  }

  getUserById(id:number):Observable<User>{
    return this.http.get<User>(this.constantService.getBaseUrl()+`users/${id}`)
  }

  addUser(user:CreateUser):Observable<any>{
    console.log(user);
    return this.http.post(this.constantService.getBaseUrl()+'users',user);
  }

  updateUser(id:number,user:UpdateUser):Observable<any>{

    return this.http.put(this.constantService.getBaseUrl()+`users/${id}`,user);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`users/${id}`);
  }

  getUserByUsername(username:string):Observable<User>{

    return this.http.get<User>(this.constantService.getBaseUrl()+`users/${username}`);
  }
}
