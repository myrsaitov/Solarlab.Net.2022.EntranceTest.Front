import { AuthService } from '../../services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CongratulationService } from '../../services/congratulation.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GetPagedContentResponseModel } from '../../models/congratulation/get-paged-content-response-model';
import { ActivatedRoute } from '@angular/router';
import { ICategory } from 'src/app/models/category/category-model';
import { CategoryService } from 'src/app/services/category.service';
import { TagService } from 'src/app/services/tag.service';
import { IUserFile } from 'src/app/models/user-files/userfile-model';
import { UserFilesService } from 'src/app/services/userfiles.service';
import { RegionService } from 'src/app/services/region.service';
import { RouterService } from 'src/app/services/router.service';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {
  response$: Observable<GetPagedContentResponseModel>;
  isAuth = this.authService.isAuth;
  userFiles$: Observable<IUserFile[]>;
  userFiles: IUserFile[];
  
  private congratulationsFilterSubject$ = new BehaviorSubject({
    searchStr: null,
    ownerId: null,
    categoryId: null,
    tag: null,
    pageSize: 9,
    page: 0
  });
  congratulationsFilterChange$ = this.congratulationsFilterSubject$.asObservable();

  constructor(
    private readonly authService: AuthService,
    private readonly congratulationService: CongratulationService,
    private readonly route: ActivatedRoute,
    private readonly router: RouterService, // используется на форме
    private readonly userFilesService: UserFilesService,
    private readonly categoryService: CategoryService,
    private readonly regionService: RegionService,
    private readonly tagService: TagService) {
  }

  ngOnInit() {
    
    // Инициализация сервисов
    this.categoryService.onInit();
    this.regionService.onInit();
    this.tagService.onInit();

    // Подписка на файлы
    this.userFiles$ = this.userFilesService.getUserFilesList({
      pageSize: 1000,
      page: 0,
    });
    this.userFiles$.subscribe(userFiles => {
      this.userFiles = userFiles;
    });   

    // Загружает сессию
    this.authService.loadSession();

    // Проверяет, произошла ли авторизация
    this.isAuth = this.authService.isAuth;

    // Обработка запроса с фильтрацией поздравлений
    this.route.queryParams.subscribe(params => {
      this.congratulationsFilterSubject$.value.searchStr = null;
      this.congratulationsFilterSubject$.value.ownerId = null;
      this.congratulationsFilterSubject$.value.categoryId = null;
      this.congratulationsFilterSubject$.value.tag = null;

      if('searchStr' in params){
        this.congratulationsFilterSubject$.value.searchStr = params.searchStr;
      }
      else if('ownerId' in params){
        this.congratulationsFilterSubject$.value.ownerId = params.ownerId;
      }
      else if('categoryId' in params){
        this.congratulationsFilterSubject$.value.categoryId = params.categoryId;
      }
      else if('tag' in params){
        this.congratulationsFilterSubject$.value.tag = params.tag;
      }

      this.congratulationsFilterSubject$.next({
        ...this.congratulationsFilter
      });
    });

    // Возвращает список поздравлений по фильтру
    this.response$ = this.congratulationsFilterChange$.pipe( // pipe - применить указанное действие ко всем элементам конвейера
      switchMap(congratulationsFilter => this.congratulationService.getCongratulationsList(congratulationsFilter)
    ));
  }
  
  // Возвращает ссылку на файл по идентификатору
  getUserFileUriById(id: number){
    if (typeof id === 'undefined') {
      return "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
    }
    else {
      var file = this.userFiles.find(s => s.id === id);
      if (typeof file === 'undefined') {
        return "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
      }
      else {
        return file.filePath;
      }
    }
  }

  // Возвращает фильтр поздравлений (параметры пагинации)
  get congratulationsFilter() {
    return this.congratulationsFilterSubject$.value;
  }

  // Обновляет страницу при изменении фильтра
  updateCongratulationsFilterPage(page) {
    this.congratulationsFilterSubject$.next({
      ...this.congratulationsFilter,
      page
    });
  }

  // Действия на закрытие
  ngOnDestroy() {
    // Завершение сервисов
    this.categoryService.onDestroy();
    this.regionService.onDestroy();
    this.tagService.onDestroy();
  }
  
}