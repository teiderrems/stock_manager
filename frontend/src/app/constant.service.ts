import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  private readonly backendUrl: string ="http://localhost:5138/api/";
  getBaseUrl(){
    return this.backendUrl;
  }
}
