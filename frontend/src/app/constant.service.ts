import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  private readonly backendUrl: string ="http://localhost:5138/api/"; //"https://backend20241115142223.azurewebsites.net"
  getBaseUrl(){
    return this.backendUrl;
  }
}
