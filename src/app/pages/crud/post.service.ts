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
export class PostService {

  postUrl = 'http://localhost:3000/posts/';
  categoriesUrl = 'http://localhost:3000/categories/';

  constructor(private http:HttpClient) { }
  
  getPosts() {
    return this.http.get<any[]>(this.postUrl);
  }

  getPost(id:any) {
    return this.http.get<any[]>(this.postUrl+id);
  }

  addPost(data:any) {
    return this.http.post<any>(this.postUrl,data)
  }

  deletePost(id:any) {
    return this.http.delete<any>(this.postUrl+id)
  }

  updatePost(id:any,data:any) {
    return this.http.patch<any>(this.postUrl+id,data)
  }

  getCategories() {
    return this.http.get<any[]>(this.categoriesUrl);
  }

  getCategory(id:any) {
    return this.http.get<any[]>(this.categoriesUrl+id);
  }

  addCategory(data:any) {
    return this.http.post<any>(this.categoriesUrl,data)
  }

  deleteCategory(id:any) {
    return this.http.delete<any>(this.categoriesUrl+id)
  }

  updateCategory(id:any,data:any) {
    return this.http.patch<any>(this.categoriesUrl+id,data)
  }

  
}
