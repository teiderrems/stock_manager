import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture, PictureResponseBody } from '../../interfaces';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../constant.service';

@Injectable({
  providedIn: 'root'
})
export class PictureService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllPicture():Observable<PictureResponseBody>{
    return this.http.get<PictureResponseBody>(this.constantService.getBaseUrl()+'pictures');
  }

  getPictureById(id:number):Observable<Picture>{
    return this.http.get<Picture>(this.constantService.getBaseUrl()+`pictures/${id}`)
  }

  addPicture(picture:FormData):Observable<any>{
    return this.http.post(this.constantService.getBaseUrl()+'pictures',picture);
  }

  updatePicture(id:number,picture:FormData):Observable<any>{
    
    return this.http.put(this.constantService.getBaseUrl()+`pictures/${id}`,picture);
  }

  deletePicture(id:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`pictures/${id}`);
  }
}
