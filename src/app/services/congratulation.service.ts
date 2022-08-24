import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { GetPagedCongratulationModel } from '../models/congratulation/get-paged-congratulation-model';
import { ICongratulation } from '../models/congratulation/i-congratulation';
import { GetPagedContentResponseModel } from '../models/congratulation/get-paged-content-response-model';
import { ICreateCongratulation } from '../models/congratulation/congratulation-create-model';
import { IEditCongratulation } from '../models/congratulation/congratulation-edit-model';
import { environment } from 'src/environments/environment';
import { IEditCongratulationStatus } from '../models/congratulation/congratulation-status-edit-model';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.
})

export class CongratulationService {
  private ROOT_URL = `${environment.baseCongratulationsApiUrl}api/v1/congratulations`;
  private decpage: number;

  constructor(
    private readonly http: HttpClient) {
  }

  // Возвращает список поздравлений с поиском
  getCongratulationsList(model: GetPagedCongratulationModel): Observable<GetPagedContentResponseModel> {
    
    const {searchStr, ownerId, categoryId, tag, page, pageSize} = model;
    if (page == null || pageSize == null) {
      return;
    }

    this.decpage = 0;

    if(page > 0)
    {
      this.decpage = page - 1;
    }

    if((searchStr == null)&&(ownerId == null)&&(categoryId == null)&&(tag == null))
    {
      const params = new HttpParams()
      .set('page', `${this.decpage}`)
      .set('pageSize', `${pageSize}`);


      var ret = this.http.get<GetPagedContentResponseModel>(`${this.ROOT_URL}`, {params})
        .pipe(
            catchError((err) => { // Если в ответ на запрос пришла ошибка
              console.error(err);
              return EMPTY;
            }));
      return ret;

    }
    else if((searchStr != null)&&(ownerId == null)&&(categoryId == null)&&(tag == null))
    {
      const params = new HttpParams()
      .set('searchStr', `${searchStr}`)
      .set('page', `${this.decpage}`)
      .set('pageSize', `${pageSize}`);

      var ret = this.http.get<GetPagedContentResponseModel>(`${this.ROOT_URL}`, {params})
        .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
            console.error(err);
            return EMPTY;
          }));
      return ret;
    }
    else if((searchStr == null)&&(ownerId != null)&&(categoryId == null)&&(tag == null))
    {
      const params = new HttpParams()
      .set('ownerId', `${ownerId}`)
      .set('page', `${this.decpage}`)
      .set('pageSize', `${pageSize}`);

      var ret = this.http.get<GetPagedContentResponseModel>(`${this.ROOT_URL}`, {params})
        .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
            console.error(err);
            return EMPTY;
          }));
      return ret;
    }
    else if((searchStr == null)&&(ownerId == null)&&(categoryId != null)&&(tag == null))
    {
      const params = new HttpParams()
      .set('categoryId', `${categoryId}`)
      .set('page', `${this.decpage}`)
      .set('pageSize', `${pageSize}`);

      var ret = this.http.get<GetPagedContentResponseModel>(`${this.ROOT_URL}`, {params})
        .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
            console.error(err);
            return EMPTY;
          }));
    return ret;
    }
    else if((searchStr == null)&&(ownerId == null)&&(categoryId == null)&&(tag != null))
    {
      const params = new HttpParams()
      .set('tag', `${tag}`)
      .set('page', `${this.decpage}`)
      .set('pageSize', `${pageSize}`);

      var ret = this.http.get<GetPagedContentResponseModel>(`${this.ROOT_URL}`, {params})
        .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
            console.error(err);
            return EMPTY;
          }));
      return ret;
    }
  }

  // Возвращает поздравление по Id
  getCongratulationById(id: number) {
    return this.http.get<ICongratulation>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
        console.error(err);
        return EMPTY;
      }));
      
  }

  // Создает новое поздравление
  create(model: ICreateCongratulation) {
    return this.http.post(
      `${this.ROOT_URL}`,
      model)
        .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
          console.error(err);
          return EMPTY;
        }));
  }

  // Редактирует поздравление
  edit(formData: FormData) {
    return this.http.put(
      `${this.ROOT_URL}/update`,
      formData)
        .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
          console.error(err);
          return EMPTY;
        }));
  }

  // Изменяет статус поздравления
  editStatus(model: IEditCongratulationStatus) {
    return this.http.put(`${this.ROOT_URL}/update-status`, model)
      .pipe(
        map(res => {
          // Определяем статус поздравления, который присвоил ему бэк
          let status = JSON.parse(JSON.stringify(res)).status;
          return status;
        }),
        catchError((err) => { // Если в ответ на запрос пришла ошибка
          console.error(err);
          return EMPTY;
        }));
  }

  // Удаляет поздравление
  delete(id: number) {
    return this.http.delete<ICongratulation>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
        console.error(err);
        return EMPTY;
      }));
  }
}