import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetPagedTagResponseModel } from '../models/tag/get-paged-tag-response-model';
import { ITag } from '../models/tag/tag-model';
import { ITagFilter } from '../models/tag/tag-filter.model';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.s
})

export class TagService {
  private ROOT_URL = `${environment.baseCongratulationsApiUrl}api/v1/tags`;
  tags$: Observable<ITag[]>;
  private destroy$: Subject<boolean>;

  constructor(
    private readonly http: HttpClient) {
  }

  // Действия при инициализации
  onInit() {
    
    // Иначе ошибка ObjectUnsubscribedError
    this.destroy$ = new Subject<boolean>();
    this.destroy$.next(false);

    // Возвращает список
    this.tags$ = this
      .getList({
        pageSize: 1000,
        page: 0});

  }

  // Возвращает список тагов
  getList(filter: ITagFilter): Observable<ITag[]> {

    // Считывает значения фильтра
    const {page, pageSize} = filter;
    if (page == null || pageSize == null) {
      return;
    }
  
    // Преобразует значения фильтра в параметры HTTP-запроса
    const params = new HttpParams()
      .set('page', `${page}`)
      .set('pageSize', `${pageSize}`);
 
    // Выполняет HTTP-запрос
    return this.http.get<GetPagedTagResponseModel>(`${this.ROOT_URL}`, {params})
      .pipe( // pipe - применить указанное действие ко всем элементам конвейера
        map(res => res.items), // Достаёт массив с содержимым из под обёртки
        catchError((err) => { // Если в ответ на запрос пришла ошибка
          console.error(err);
          return EMPTY;
        }));

  }

  // Действия на закрытие
  onDestroy(): void  {
    // Устанавливает значение предиката завершения потока - "завершить поток"
    this.destroy$.next(true);
    // И отписывается от сабджекта
    this.destroy$.unsubscribe();
  }

}