import { Injectable } from '@angular/core';
import { CommentResponseBody } from '../../interfaces';
import { Observable } from 'rxjs';
import { ConstantService } from '../constant.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private readonly constantService:ConstantService,private readonly http:HttpClient) { }

  getAllComment(itemId:number):Observable<CommentResponseBody>{
    return this.http.get<CommentResponseBody>(this.constantService.getBaseUrl()+`items/${itemId}/comments`);
  }

  getCommentById(id:number,itemId:number):Observable<Comment>{
    return this.http.get<Comment>(this.constantService.getBaseUrl()+`items/${itemId}/comments/${id}`)
  }

  addComment(comment:Partial<Comment>,itemId:number):Observable<any>{
    return this.http.post(this.constantService.getBaseUrl()+`items/${itemId}/comments`,comment);
  }

  updateComment(id:number,itemId:number,comment:Partial<Comment>):Observable<any>{
    
    return this.http.put(this.constantService.getBaseUrl()+`items/${itemId}/comments/${id}`,comment);
  }

  deleteComment(id:number,itemId:number):Observable<any>{
    return this.http.delete(this.constantService.getBaseUrl()+`items/${itemId}/comments/${id}`);
  }
}
