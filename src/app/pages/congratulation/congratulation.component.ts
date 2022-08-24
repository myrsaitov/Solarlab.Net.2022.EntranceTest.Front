import {Component, OnInit, TemplateRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pluck, take, takeUntil } from 'rxjs/operators';
import { CongratulationService } from '../../services/congratulation.service';
import { CommentService } from '../../services/comment.service';
import { ICongratulation } from '../../models/congratulation/i-congratulation';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { CategoryService } from '../../services/category.service';
import { GetPagedCommentResponseModel } from '../../models/comment/get-paged-comment-response-model';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ChangeDetectionStrategy } from '@angular/core';
import { CreateComment, ICreateComment } from '../../models/comment/comment-create-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TagService } from '../../services/tag.service';
import { isNullOrUndefined } from 'util';
import { UserService } from 'src/app/services/user.service';
import { RegionService } from 'src/app/services/region.service';
import { EditCongratulationStatus, IEditCongratulationStatus } from 'src/app/models/congratulation/congratulation-status-edit-model';
import { UserFilesService } from 'src/app/services/userfiles.service';
import { IUserFile } from 'src/app/models/user-files/userfile-model';
import { RouterService } from 'src/app/services/router.service';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-congratulation', // A CSS selector that tells Angular to create and insert an instance of this component wherever it finds the corresponding tag in template HTML
  templateUrl: './congratulation.component.html', // The module-relative address of this component's HTML template.
  styleUrls: ['./congratulation.component.scss'], // 
  changeDetection: ChangeDetectionStrategy.Default
})

export class CongratulationComponent implements OnInit {
  congratulationForm: FormGroup;
  congratulation: ICongratulation;
  isAuth = this.authService.isAuth;
  isEditable: boolean;
  response$: Observable<GetPagedCommentResponseModel>;
  congratulationStatus: string;
  congratulationId$ = this.route.params.pipe(pluck('id'));
  private destroy$: Subject<boolean>;
  userFiles$: Observable<IUserFile[]>;
  userFiles: IUserFile[];
  userFilesSlides: string [] = [];
  userFilesSlidesIndex = 0;
  userFilesCount = 0;

  // Для показа FullScreen
  currentIndex: any = -1;
  showFlag: any = false;
  imageObject: Array<object> = [];

  private commentsFilterSubject$ = new BehaviorSubject({
    contentId: 1,
    pageSize: 10,
    page: 0
  });
  commentsFilterChange$ = this.commentsFilterSubject$.asObservable();

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: RouterService,
    private readonly congratulationService: CongratulationService,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly commentService: CommentService,
    private readonly modalService: NgbModal,
    private readonly userService: UserService,
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
      // Инициализация поздравления
      this.congratulationInit();
    });   

    // Валидация формы
    this.congratulationForm = this.fb.group({
      commentBody: ['', Validators.required],
      status: ['', Validators.required]
    });



    // Комментарии
    this.response$ = this.commentsFilterChange$
      .pipe( // pipe - применить указанное действие ко всем элементам конвейера
        switchMap(commentsFilter => this.commentService.getCommentsList(commentsFilter)
      ));
  }

  // Инициализация поздравления
  congratulationInit(){

    // Иначе ошибка ObjectUnsubscribedError
    this.destroy$ = new Subject<boolean>();
    this.destroy$.next(false);

    this
      .congratulationId$
      .pipe(
        switchMap(congratulationId => {
          return this.congratulationService.getCongratulationById(congratulationId);
        }),
        takeUntil(this.destroy$)) // Поток действует, пока не придет условие destroy$
      .subscribe(congratulation => {

        // Если поздравление не найдено
        if (isNullOrUndefined(congratulation)) {
          this.router.goToMainPage();
          return;
        }

        this.commentsFilterSubject$.value.contentId = congratulation.id;

        this.congratulation = congratulation;
        
        // Загружает данные пользователя
        this.userService.getUserById(congratulation.ownerId);

        // Заполшняем слайдер и imageObject
        this.congratulation.userFiles.forEach(userFile => {
          var uri = this.getUserFileUriById(userFile);
          this.userFilesSlides.push(uri);
          var obj = {image: uri};
          this.imageObject.push(obj);
        });
        
        // Количество файлов к поздравлению
        this.userFilesCount = this.congratulation.userFiles.length;

        // Устанавливаем значение статуса на форме
        this.status.patchValue(congratulation.status);

        // Если поздравление принадлежит авторизированному пользователю, то разрешаем редактирование
        if(this.congratulation.ownerId == localStorage.getItem('userId')) {
          this.isEditable = true;
        }
        else {
          this.isEditable = false;
        }

        // Статус
        this.congratulationStatus = this.getStatusNameByValue(this.congratulation.status);

      });
  }


  get commentsFilter() {
    this.commentsFilterSubject$.value.contentId = this.congratulation.id;
    return this.commentsFilterSubject$.value;
  }

  // Карусель картинок
  // Возвращает слайд
  getUserFilesSlide() {
    return this.userFilesSlides[this.userFilesSlidesIndex];
  }
  // Переводит счетчик слайдов на предыдущий
  getUserFilesPrevSlide() {
    if (this.userFilesSlidesIndex === 0) {
      // Если дошли до самого левого, то переходим на самый правый
      this.userFilesSlidesIndex = this.userFilesSlides.length - 1;
    }
    else {
      this.userFilesSlidesIndex -= 1;
    }
  }
  // Переводит счетчик слайдов на следующий
  getUserFilesNextSlide() {
    if (this.userFilesSlidesIndex === this.userFilesSlides.length - 1) {
      // Если дошли до самого правого, то переходим на самый левый
      this.userFilesSlidesIndex = 0;
    }
    else {
      this.userFilesSlidesIndex += 1;
    }
  }
  // Выбирает слайд из превьюшки
  getUserFilesThisSlide(index: number) {
    this.userFilesSlidesIndex = index;
  }
  // Проверяет, выбран ли слайд
  getUserFilesSlideSelectedStatus(index: number) {
    return this.userFilesSlidesIndex === index;
  }
  // Проверяет, существуют ли файлы к данному поздравлению
  getUserFilesExists() {
    return this.userFilesSlides.length > 0;
  }
  // Увеличивает картинку при зажатии мышкой

  showLightbox() {
    this.currentIndex = this.userFilesSlidesIndex;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }


  // Возвращает ссылку на файл по идентификатору
  getUserFileUriById(id: number){
    return this.userFiles.find(s => s.id === id).filePath;
  }
  
  // Возвращает статус поздравления по значению
  getStatusNameByValue(value: number){
    switch(value) { 
      case 0: { 
         return "Активно"; 
         break; 
      } 
      case 1: { 
        return "Приостановлено"; 
        break; 
      } 
      case 2: { 
        return "Черновик"; 
        break; 
      }
      case 3: { 
        return "Удалено"; 
        break; 
      }
      case 4: { 
        return "Недопустимое содержание"; 
        break; 
      } 
      default: { 
        return "No Status!"; 
        break; 
      } 
    } 
  }

  get status() { return this.congratulationForm.get('status'); }

  updateCommentsFilterPage(page) {
    this.commentsFilterSubject$.next({
      ...this.commentsFilter,
      page
    });
  }

  get commentBody() {
    return this.congratulationForm.get('commentBody');
  }

  // Удалить комментарий
  delete_comment(){
    this.commentService.delete(1).pipe(take(1)).subscribe(() => {
      this.toastService.show('Комментарий успешено удален', {classname: 'bg-success text-light'});
    
      this.router.goToCongratulationPageById(this.congratulation.id);

      this.commentsFilterSubject$.next({
        ...this.commentsFilter
      })
    });
  }

  // Обработка "Удалить поздравление"
  delete(id: number) {
    this.congratulationService.delete(id).pipe(take(1)).subscribe(() => {
      this.toastService.show(
        'Поздравление успешено удалено',
        {classname: 'bg-success text-light'});
      this.router.goToMainPage();
    });
  }

  // Вызов модальной формы "Подтвердите удаление"
  openDeleteModal(content: TemplateRef<any>) {
    this.modalService.open(content, {centered: true});
  }

  // Реакция на изменение статуса поздравления
  onChange() {

    this.congratulationId$.pipe(switchMap(id => {
      const model: Partial<IEditCongratulationStatus> = {
        id: +id,
        status: this.status.value,
      };

      return this.congratulationService.editStatus(new EditCongratulationStatus(model));
    }), take(1)).subscribe((res) => {

        console.log("***************************************");
        console.log(res);
        this.status.patchValue(res);
        // Выдаёт всплывающее сообщение о результате
        this.toastService.show(
          'Статус успешно обновлён!',
          {classname: 'bg-success text-light'});
      });
  }

  // Добавить комментарий
  submit() {

    const model: Partial<ICreateComment> = {
      body: this.commentBody.value,
      contentId: this.congratulation.id,
      parentCommentId: null
    };

    if(model.body.length == 0)
    {
      return;
    }

    this.commentService.create(new CreateComment(model)).pipe(take(1)).subscribe(() => {
      this.toastService.show('Комментарий успешено добавлен', {classname: 'bg-success text-light'});
    
      this.router.goToCongratulationPageById(this.congratulation.id);

      this.commentsFilterSubject$.next({
        ...this.commentsFilter
      })

    });

    // Валидаторы формы
    this.congratulationForm = this.fb.group({
      commentBody: ['', Validators.required]
    });

  }

  // Действия на закрытие
  ngOnDestroy(): void {

    // Устанавливает значение предиката завершения потока - "завершить поток"
    this.destroy$.next(true);
    // И отписывается от сабджекта
    this.destroy$.unsubscribe();

    // Завершение сервисов
    this.categoryService.onDestroy();
    this.regionService.onDestroy();
    this.tagService.onDestroy();

  }
  
}