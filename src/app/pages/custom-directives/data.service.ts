import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Post {
  userId:number,
  id:number,
  title:string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http:HttpClient) { }
  
  getPosts() {
    return this.http.get<Post[]>(this.url);
  }
}
