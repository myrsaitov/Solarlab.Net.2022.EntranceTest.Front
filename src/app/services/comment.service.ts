import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {GetPagedCommentModel} from '../models/comment/get-paged-comment-model';
import {GetPagedCommentResponseModel} from '../models/comment/get-paged-comment-response-model';
import {ICreateComment} from '../models/comment/comment-create-model';
import {IComment} from '../models/comment/i-comment';

// The @Injectable() decorator specifies that Angular can use this class in the DI system.
// providedIn: 'root', means that the Service is visible throughout the application.
@Injectable({
  providedIn: 'root' // declares that this service should be created by the root application injector.
})

export class CommentService {
  private ROOT_URL = `api/v1/comments`;
  private decpage: number;

  constructor(
    private readonly http: HttpClient) {
  }

  // Возвращает список комментариев
  getCommentsList(model: GetPagedCommentModel): Observable<GetPagedCommentResponseModel> {
    
    const {contentId, page, pageSize} = model;
    if (contentId == null ||page == null || pageSize == null) {
      return;
    }

    this.decpage = 0;

    if(page > 0)
    {
      this.decpage = page - 1;
    }

    const params = new HttpParams()
      .set('contentid', `${contentId}`)
      .set('page', `${this.decpage}`)
      .set('pageSize', `${pageSize}`);

      var ret = this.http.get<GetPagedCommentResponseModel>(`${this.ROOT_URL}`, {params})
    .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
      console.error(err);
      return EMPTY;
    }));
    return ret;
  }

  // Создаёт новый комментарий
  create(model: ICreateComment) {
    return this.http.post(`${this.ROOT_URL}`, model)
      .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
        console.error(err);
        return EMPTY;
      }));
  }

  // Удаляет комментарий
  delete(id: number) {
    return this.http.delete<IComment>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError((err) => { // Если в ответ на запрос пришла ошибка
        console.error(err);
        return EMPTY;
      }));
  }

}