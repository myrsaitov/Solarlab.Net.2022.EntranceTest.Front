import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HTTPCodeEnum } from '../shared/enums/e-http-response';
import { Router } from '@angular/router';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private readonly router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe( // pipe - применить указанное действие ко всем элементам конвейера
        catchError((error) => { // Если в ответ на запрос пришла ошибка
          if (error.status === HTTPCodeEnum.Unauthorized) {
            this.router.navigate(['/', 'login_error']);
          }
          return throwError(error);
        })
      );
  }
}