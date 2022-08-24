import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, takeUntil } from 'rxjs/operators';
import { ICategory } from '../models/category/category-model';
import { ICategoryFilter } from '../models/category/category-filter.model';
import { GetPagedCategoryResponseModel } from '../models/category/get-paged-category-response-model';
import { EMPTY, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.
})

export class CategoryService {
  private ROOT_URL = `${environment.baseCongratulationsApiUrl}api/v1/categories`;
  categories: ICategory[];
  categories$: Observable<ICategory[]>;
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
    this.categories$ = this
      .getList({
        pageSize: 1000,
        page: 0});

    // Подписка
    this.categories$
      .subscribe(res => {
        if (res !== null) {
          this.categories = res
        }
      });

  }

  // Возвращает имя категории по идентификатору
  getCategoryNameById(categoryId: number){
    if (typeof this.categories === 'undefined') {
      return "[categories unavailable]";
    }
    else {
      return this.categories.find(s => s.id === categoryId).name;
    }
  }

  // Возвращает список категорий
  getList(filter: ICategoryFilter): Observable<ICategory[]> {

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
    return this.http.get<GetPagedCategoryResponseModel>(`${this.ROOT_URL}`, {params})
      .pipe( // pipe - применить указанное действие ко всем элементам конвейера
        map(res => res.items), // Достаёт массив с содержимым из под обёртки
        catchError((err) => { // Если в ответ на запрос пришла ошибка
          console.error(err);
          return EMPTY;
        }),
        takeUntil(this.destroy$)); // Поток действует, пока не придет условие destroy$)

  }

  // Действия на закрытие
  onDestroy(): void  {
    // Устанавливает значение предиката завершения потока - "завершить поток"
    this.destroy$.next(true);
    // И отписывается от сабджекта
    this.destroy$.unsubscribe();
  }

}