import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  private readonly backendUrl: string ="https://backend20241115142223.azurewebsites.net";//"http://localhost:5138/api/"
  getBaseUrl(){
    return this.backendUrl;
  }
}
