import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, retry, tap } from 'rxjs';

export interface Post {
  userId:number,
  id:number,
  title:string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class SCService {

  iaasUrl = 'http://localhost:3000/iaas/';
  categoriesUrl = 'http://localhost:3000/categories/';
  usersUrl = 'http://localhost:3000/users/';
  agenciesUrl = 'http://localhost:3000/agencies/';
  constructorsUrl = 'http://localhost:3000/contractors/';

  private error$ = new Subject<Error | null>();
  errorObs = this.error$.asObservable();
  private retry$ = new Subject<void>();
  retryObs = this.error$.asObservable();

  constructor(private http:HttpClient) { }
  
  allIaas() {
    return this.http.get<any[]>(this.iaasUrl).pipe(
      tap(() => {
        this.error$.next(null);
      }),
      retry({
        delay: (err) => {
          this.error$.next(err);
          return this.retry$;
        },
      })
    );
  }

  retryFetchPost() {
    this.retry$.next();
  }

  getIaas() {
    return this.http.get<any[]>(this.iaasUrl);
  }

  getIaa(id:any) {
    return this.http.get<any[]>(this.iaasUrl+id);
  }

  getPost(id:any) {
    return this.http.get<any[]>(this.iaasUrl+id);
  }

  addPost(data:any) {
    return this.http.post<any>(this.iaasUrl,data)
  }

  deletePost(id:any) {
    return this.http.delete<any>(this.iaasUrl+id)
  }

  updatePost(id:any,data:any) {
    return this.http.patch<any>(this.iaasUrl+id,data)
  }
  ////////////


  getAgencies() {
    return this.http.get<any[]>(this.agenciesUrl);
  }

  getContractors() {
    return this.http.get<any[]>(this.constructorsUrl);
  }

  ///////////categories//////
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

  ///////end categories///////

  getUsers() {
    return this.http.get<any[]>(this.usersUrl);
  }

  updateUser(id:any,data:any) {
    return this.http.patch<any>(this.usersUrl+id,data)
  }

  
}
