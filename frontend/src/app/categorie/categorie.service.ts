import { Injectable } from '@angular/core';
import { ConstantService } from '../constant.service';
import { Categorie, CategorieResponseBody } from '../../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllCategorie():Observable<CategorieResponseBody>{
    return this.http.get<CategorieResponseBody>(this.constantService.getBaseUrl()+`categories`);
  }

  getCategorieById(id:number):Observable<Categorie>{
    return this.http.get<Categorie>(this.constantService.getBaseUrl()+`categories/${id}`)
  }

  addCategorie(categorie:Partial<Categorie>):Observable<any>{
    return this.http.post(this.constantService.getBaseUrl()+`categories`,categorie);
  }

  updateCategorie(id:number,categorie:Partial<Categorie>):Observable<any>{
    
    return this.http.put(this.constantService.getBaseUrl()+`categories/${id}`,categorie);
  }

  deleteCategorie(id:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`categories/${id}`);
  }
}
