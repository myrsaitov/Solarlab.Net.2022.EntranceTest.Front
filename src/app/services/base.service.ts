import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.
})

export class BaseService {

  constructor(
    private readonly http: HttpClient) {
  }

  public post(apiURL: string, payload: any = {}): Promise<any> {

/*
    this.http.post(apiURL, payload, {responseType: 'text'})
      .subscribe(
      (val) => {console.log("1. POST call successful value returned in body",val);},
      response => {console.log("2. POST call in error", response);},
      () => {console.log("3. The POST observable is now completed.");});
*/

//user2@test.ru 12@324fDF4_
//(click)="register()"
    var res = this.http.post(apiURL, payload, {responseType: 'text'}).toPromise()
    
    // Обработка ошибки неверного имени/пароля
    .catch((err) => {
      // simple logging, but you can do a lot more, see below
      console.error('An error occurred:', err.error);
    });
    
    
    
    return res;
    
    
  }
}
