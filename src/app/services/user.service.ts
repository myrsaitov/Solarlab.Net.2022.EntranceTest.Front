import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError,  switchMap, take } from 'rxjs/operators';
import { EMPTY, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/user/user-model';
import { ILogin } from '../models/account/login.model';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IRegister } from '../models/account/register.model';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.s
})

export class UserService {
  private ROOT_URL = `${environment.baseAccountsApiUrl}api/v1/accounts`;
  user: IUser;

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService,
    private readonly router: Router) {
  }

  // Возвращает пользователя по идентификатору
  getUserById(userId: string){
    this.http
      .get<IUser>(`${this.ROOT_URL}/user/${userId}`)
      .pipe(
        take(1), // Берёт одно значение и закрывает поток
        catchError((err) => { // Если в ответ на запрос пришла ошибка
          console.error(err);
          return EMPTY;
        }))
      .subscribe(
        user => this.user = user
      );
  }

  // Авторизация пользователя
  login(model: ILogin): Observable<boolean> {
    return this
      .http
      .put(
        `${this.ROOT_URL}/login`,
        model)
      .pipe(
        take(1), // Берёт одно значение и закрывает поток
        switchMap((res: any) => {
          // Сохраняет сессию
          this.auth.saveSession(res);
          // Открывает главную страницу
          this.router.navigate(['/']);
          // Возвращает удачный результат авторизации
          return of(true);
        }),
        catchError(() => { // Если в ответ на запрос пришла ошибка
          // Возвращает удачный результат авторизации 
          return of(false);
        })
      );
  }

  // Регистрация пользователя
  register(model: IRegister): Observable<boolean> {
    return this
      .http
      .post(
        `${this.ROOT_URL}/register`,
        model)
      .pipe(
        take(1), // Берёт одно значение и закрывает поток
        switchMap(() => {
          // Возвращает удачный результат регистрации
          return of(true);
        }),
        catchError(() => { // Если в ответ на запрос пришла ошибка
          // Возвращает неудачный результат регистрации
          return of(false);
        }));
  }
  
}