import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ResourceService } from './resource.service';

export interface IPost {
  id?:number,
  title:string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService extends ResourceService<IPost>{


  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>('http://localhost:3000/articals')
      .pipe(
        tap(res => this.setResources(res)
      ));
  }

  createPost(post:IPost):Observable<IPost> {
    console.log("Create")
    delete post.id;
    return this.http.post<IPost>('http://localhost:3000/articals',post)
    .pipe(
      tap(this.upsertResource));
  }

  updatePost(post:IPost):Observable<IPost> {
    return this.http.put<IPost>(`http://localhost:3000/articals/${post.id}`,post)
    .pipe(
      tap(this.upsertResource));
  }

  deletePost(post:IPost):Observable<IPost> {
    return this.http.delete<IPost>(`http://localhost:3000/articals/${post.id}`)
    .pipe(
      tap(() => this.removeResource(post.id as number)));
  }

}
