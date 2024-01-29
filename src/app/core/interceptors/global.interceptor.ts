import { Injectable, inject } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';
 
@Injectable()
export class GlobalHttpInterceptor implements HttpInterceptor {
 
  router = inject(Router);
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = 'invald token';
    req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    return next.handle(req).pipe(
        catchError((error) => {
            console.error(error);
            if (error instanceof HttpErrorResponse) {
                console.log(`error status : ${error.status} ${error.statusText}`);
                switch (error.status) {
                case 401:      //login
                    this.router.navigateByUrl("/login");
                    console.log(`redirect to login`);
                    break;
                case 403:     //forbidden
                    this.router.navigateByUrl("/unauthorized-access");
                    console.log(`redirect to login`);
                    break;
                }
            }
            return throwError(() => error);
        })
    )
  }
}