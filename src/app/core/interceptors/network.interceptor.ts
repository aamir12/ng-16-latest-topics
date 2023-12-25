import { Injectable, inject } from "@angular/core";
import { LoadingService } from "../loading.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, delay, finalize } from "rxjs";

@Injectable()
export class NetworkInterceptor implements HttpInterceptor {
  totalRequests = 0;
  completedRequests = 0;
  loaderService = inject(LoadingService);

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log("NetworkInterceptor")
    this.loaderService.show();
    this.totalRequests++;
    return next.handle(request).pipe(
      finalize(() => {
        this.completedRequests++;
        if (this.completedRequests === this.totalRequests) {
          this.loaderService.hide();
          this.completedRequests = 0;
          this.totalRequests = 0;
        }
      })
    );
  }
}
