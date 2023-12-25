import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, delay, tap, throwError } from 'rxjs';
import { ResourceService } from './resource.service';
import { handleError } from 'src/app/core/errorHandler';
import { Router } from '@angular/router';

export interface IPost {
  id?:number,
  title:string
}

@Injectable({
  providedIn: 'root'
})
export class TodoService extends ResourceService<IPost>{
  router = inject(Router);
  selectedPost = signal<IPost | null>(null);

  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>('http://localhost:3000/articals')
      .pipe(
        delay(1000),
        tap((res) => this.setResources(res)),
        catchError((error) => {
          return handleError(error,this.router)
        })
      );
  }

  createPost(post:IPost):Observable<IPost> {
    console.log("Create")
    delete post.id;
    return this.http.post<IPost>('http://localhost:3000/articals',post)
    .pipe(
      delay(1000),
      tap(this.upsertResource),
      catchError((error) => {
        return handleError(error,this.router)
      }));
  }

  updatePost(post:IPost):Observable<IPost> {
    return this.http.put<IPost>(`http://localhost:3000/articals/${post.id}`,post)
    .pipe(
      delay(1000),
      tap(this.upsertResource),
      catchError((error) => {
        return handleError(error,this.router)
      }));
  }

  deletePost(post:IPost):Observable<IPost> {
    return this.http.delete<IPost>(`http://localhost:3000/articals/${post.id}`)
    .pipe(
      delay(1000),
      tap(() => this.removeResource(post.id as number)),
      catchError((error) => {
        return handleError(error,this.router)
      }));
  }

  setSelectedPost(post:IPost) {
    this.selectedPost.set(post);
  }

}
