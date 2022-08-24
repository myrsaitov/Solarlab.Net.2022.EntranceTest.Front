import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
@Injectable()

export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${req.url}`;
    const clonedReq = req.clone({url});
    return next.handle(clonedReq);
  }
}