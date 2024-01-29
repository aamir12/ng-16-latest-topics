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
  selectedPost = signal<IPost | null>(null);

  getPosts(): Observable<IPost[]> {
    return this.http
      .get<IPost[]>('http://localhost:3000/articals')
      .pipe(
        tap((res) => this.setResources(res)),
        catchError((error) => {
          return handleError(error)
        })
      );
  }

  createPost(post:IPost):Observable<IPost> {
    delete post.id;
    return this.http.post<IPost>('http://localhost:3000/articals',post)
    .pipe(
      tap(this.upsertResource),
      catchError((error) => {
        return handleError(error)
      }));
  }

  updatePost(post:IPost):Observable<IPost> {
    return this.http.put<IPost>(`http://localhost:3000/articals/${post.id}`,post)
    .pipe(
      tap(this.upsertResource),
      catchError((error) => {
        return handleError(error)
      }));
  }

  deletePost(post:IPost):Observable<IPost> {
    return this.http.delete<IPost>(`http://localhost:3000/articals/${post.id}`)
    .pipe(
      tap(() => this.removeResource(post.id as number)),
      catchError((error) => {
        return handleError(error)
      }));
  }

  setSelectedPost(post:IPost) {
    this.selectedPost.set(post);
  }

}
