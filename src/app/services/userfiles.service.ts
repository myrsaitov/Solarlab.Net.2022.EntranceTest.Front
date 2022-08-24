import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, take} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserFilesFilter } from '../models/user-files/userfiles-filter.model';
import { IUserFile } from '../models/user-files/userfile-model';
import { GetPagedUserFilesResponseModel } from '../models/user-files/get-paged-userfiles-response-model';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.s
})

export class UserFilesService {
  private ROOT_URL = `${environment.baseUserFilesApiUrl}api/v1/userfiles`;

  constructor(
    private readonly http: HttpClient) {
  }

  // Возвращает файл по Id
  getUserFileById(id: number) {
    return this.http.get<IUserFile>(`${this.ROOT_URL}/${id}`)
      .pipe(
        take(1), // Берёт одно значение и закрывает поток
        catchError((err) => { // Если в ответ на запрос пришла ошибка
        console.error(err);
        return EMPTY;
      }));
      
  }

  // Возвращает список файлов
  getUserFilesList(filter: IUserFilesFilter): Observable<IUserFile[]> {

    let source = Observable.create(observer => {

      const {page, pageSize} = filter;
      if (page == null || pageSize == null) {
        return;
      }
  
      const params = new HttpParams()
      .set('page', `${page}`)
      .set('pageSize', `${pageSize}`);
 
      this.http.get<GetPagedUserFilesResponseModel>(`${this.ROOT_URL}`, {params})
        .pipe( // pipe - применить указанное действие ко всем элементам конвейера
          catchError((err) => { // Если в ответ на запрос пришла ошибка
            console.error(err);
            return EMPTY;
          }))
        .subscribe(userFile => {
          if (userFile !== null) {
            observer.next(userFile.items)
            console.log(userFile)
          }
        });
    })
  return source;
  }
}