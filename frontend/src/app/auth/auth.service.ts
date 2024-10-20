import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';
import { HttpClient } from '@angular/common/http';
import { Login, LoginResponseBody, Register, ResetPassword } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  login(credentiels:Login):Observable<LoginResponseBody>{
    
    let url=this.constantService.getBaseUrl().split("api")[0]+"login";

    return this.http.post<LoginResponseBody>(url,credentiels);
  }

  register(credentiels:Register):Observable<any>{

    let url=this.constantService.getBaseUrl().split("api")[0]+"register";

    return this.http.post<any>(url,credentiels);
  }

  refreshToken(refresh:string):Observable<LoginResponseBody>{
    let url=this.constantService.getBaseUrl().split("api")[0]+"refresh";
    return this.http.post<LoginResponseBody>(url,{
      refreshToken:refresh
    });
  }

  forgotPassword(email:string):Observable<any>{
    let url=this.constantService.getBaseUrl().split("api")[0]+"refresh";
    return this.http.post<any>(url,{
      email
    });
  }

  resetPassword(credentiels:ResetPassword):Observable<any>{
    let url=this.constantService.getBaseUrl().split("api")[0]+"resetPassword";
    return this.http.post<any>(url,credentiels);
  }
}
