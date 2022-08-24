import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.
})

export class AuthService {
  private readonly sessionToken = '  login_session';
  private readonly sessionUserName = 'userName';
  private readonly sessionUserId = 'userId';
  private readonly sessionRoles = 'roles';
  private readonly sessionRegionId = 'regionId';

  private isAuthSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get isAuth() {
    return this.isAuthSubject$.value;
  }

  get isAuth$() {
    return this.isAuthSubject$.asObservable();
  }

  // Загружает сессию
  loadSession(): void {
    this.isAuthSubject$.next(!!this.getSession());
  }

  // Сохраняет данные о сессии в хранилище
  saveSession(response: any): void {
    var resStr = JSON.stringify(response);
    // Токен
    localStorage.setItem(this.sessionToken, JSON.parse(resStr).token);
    // UserName
    localStorage.setItem(this.sessionUserName, JSON.parse(resStr).userName);
    // UserId
    localStorage.setItem(this.sessionUserId, JSON.parse(resStr).userId);
    // RegionId
    localStorage.setItem(this.sessionRegionId, JSON.parse(resStr).regionId);
    // Roles
    localStorage.setItem(this.sessionRoles, JSON.parse(resStr).roles);

    // Загружает эту сессию после сохранения
    this.isAuthSubject$.next(!!this.getSession());
  }

  // Возвращает данные о сессии из хранилища
  getSession(): string {
    return localStorage.getItem(this.sessionToken);
  }

  // Удаляет данные о сессии их хранилища
  deleteSession(): void {
    // Токен
    localStorage.removeItem(this.sessionToken);
    // UserName
    localStorage.removeItem(this.sessionUserName);
    // UserId
    localStorage.removeItem(this.sessionUserId);
    // RegionId
    localStorage.removeItem(this.sessionRegionId);
    // Roles
    localStorage.removeItem(this.sessionRoles);

    this.isAuthSubject$.next(!!this.getSession());
  }

  // Возвращает UserName
  getUserName() {
    return localStorage.getItem(this.sessionUserName);
  }
  // Возвращает UserId
  getUserId() {
    return localStorage.getItem(this.sessionUserId);
  }
  // Возвращает RegionId
  getRegionId() {
    return localStorage.getItem(this.sessionRegionId);
  }
  // Возвращает Roles
  getRoles() {
    return localStorage.getItem(this.sessionRoles);
  }

  // Проверяет, произошла ли аутентификация
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(!!this.getSession());
    });
  }
}