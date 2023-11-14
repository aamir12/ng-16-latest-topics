import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, filter, map, tap } from 'rxjs';

interface Endpoints {
  userId:number,
  id:number,
  title:string,
  body:string
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private endpoints = new BehaviorSubject<Endpoints | null>(null);
  readonly api$ = this.endpoints.asObservable().pipe(
    filter(endpoints => !!endpoints),
    tap(()=>{
      this.removeLoader();
    }),
    map(endpoints => endpoints?.userId)
  )

  removeLoader() {
    document.getElementById('initialLoading')?.remove();
  }

  get api() {
    return this.endpoints.getValue()?.userId;
  }

  constructor(private http: HttpClient) { }

  fetchEndpoints() {
    this.http.get<Endpoints>(`https://jsonplaceholder.typicode.com/posts/1`)
      .pipe(delay(1000))
      .subscribe({
        next: (endpoints) => this.endpoints.next(endpoints),
        error: () => this.endpoints.next(null)
      })
  }


}