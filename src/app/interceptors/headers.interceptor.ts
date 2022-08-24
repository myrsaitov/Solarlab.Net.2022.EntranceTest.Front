import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
@Injectable()

export class AuthHeadersInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService) {
  }

  // Интерцептор добавляет хидеры авторизации, если авторизированы, а если нет, то делает next
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    
    // Проверяет, авторизирован ли пользователь
    if(this.authService.isAuth) {
      const httpRequest = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${this.authService.getSession()}`
        }
      });
      return next.handle(httpRequest);
    }
    else {
      // Если не авторизирован
      return next.handle(req);
    }
  }
}