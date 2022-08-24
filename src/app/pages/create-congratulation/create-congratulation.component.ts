import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CongratulationService} from '../../services/congratulation.service';
import {CreateCongratulation, ICreateCongratulation} from '../../models/congratulation/congratulation-create-model';
import {take} from 'rxjs/operators';
import {ToastService} from '../../services/toast.service';
import {CategoryService} from '../../services/category.service';
import {Observable, ReplaySubject} from 'rxjs';
import {ICategory} from '../../models/category/category-model';
import { TagService } from '../../services/tag.service';
import { RegionService } from 'src/app/services/region.service';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { IUserFile, UserFile } from 'src/app/models/user-files/userfile-model';
import { RouterService } from 'src/app/services/router.service';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-create-congratulation',
  templateUrl: './create-congratulation.component.html',
  styleUrls: ['./create-congratulation.component.scss']
})
export class CreateCongratulationComponent implements OnInit {
  form: FormGroup;
  uri: string;
  formData: FormData = new FormData();
  userFiles: IUserFile[] = [];
  fileIdOnForm: number = 0; // идентификатор файла на форме

  constructor(
    private readonly fb: FormBuilder,
    private readonly congratulationService: CongratulationService,
    private readonly router: RouterService,
    private readonly toastService: ToastService,
    private readonly authService: AuthService,
    private readonly sanitizer: DomSanitizer,
    private readonly categoryService: CategoryService,
    private readonly regionService: RegionService,
    private readonly tagService: TagService) {
  }

  ngOnInit() {
    
    // Инициализация сервисов
    this.categoryService.onInit();
    this.regionService.onInit();
    this.tagService.onInit();

    // Валидаторы
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.maxLength(1000)]],
      price: ['', [Validators.required, Validators.pattern("[0-9,]*"), Validators.maxLength(10)]],
      categoryId: [null, Validators.required],
      regionId: [localStorage.getItem('regionId'), [Validators.required]],
      address: ['', [Validators.maxLength(100)]],
      input_tags: ['', [Validators.maxLength(50)]],
      status: [0, [Validators.required]],
    });
  }

  // Возвращает значение c формы соответсвующего поля
  get title() { return this.form.get('title'); }
  get body() { return this.form.get('body'); }
  get price() { return this.form.get('price'); }
  get categoryId() { return this.form.get('categoryId'); }
  get regionId() { return this.form.get('regionId'); }
  get address() { return this.form.get('address'); }
  get input_tags() { return this.form.get('input_tags'); }
  get status() { return this.form.get('status'); }

  // Удаление файла
  onFileDeleteFromForm(id) {
    // Удаляет элемент из массива картинок с индексом id.
    // Тут надо заметить, что индекс элемента в массиве 
    // может меняться (т.к. добавляются или удаляются элементы),
    // а индекс файла уникален. В связи с чем, сначала нужно найти 
    // элемент, у которого индекс равен id, вычислить его индекс и только потом удалять
    this.userFiles.forEach((element,index) => { //index - это индекс элемента в массиве
      if(element.fileIdOnForm==id) {
        this.userFiles.splice(index,1);
      }
    });
  }

  // Обработка загрузки файлов с формы https://blog.angular-university.io/angular-file-upload/
  onFileSelected(event) {

    // FileList и ForEach напрямую несовместимы, поэтому:
    Array.from(event.target.files).forEach(
      (file: any) => {
        if (file) {

          // Проверка размера файла
          if(file.size > 10000000) {// размер в байтах, ~10 МБ
            // Сообщает об ошибке
            this.toastService.show(
              'Файл слишком объемный!',
              {classname: 'bg-warning text-dark'});
          }
          else {

            // Отключить защиту ссылок
            // https://angular.io/api/platform-browser/DomSanitizer#description
            var tmpPreviewUri = this.sanitizer.bypassSecurityTrustResourceUrl(
              URL.createObjectURL(file));

            // Конвертирует файл в base64
            this.convertFile(file).subscribe(base64 => {
              // Ожидание конца преобразования в base64, а затем:

              // Создает модель файла
              const model: Partial<IUserFile> = {
                fileIdOnForm: this.fileIdOnForm++,
                tmpPreviewUri: tmpPreviewUri,
                contentBase64: base64,
                //name: file.name,
                fileName: file.name, //
                contentType: file.type, //
                //contentDisposition: file.contentDisposition,
                length: file.size //
              };
                
              // Добавляет его в массив 
              this.userFiles.push(new UserFile(model));
            });
          }
        }
    });
  }

  // Преобразует файл в base64
  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }

  // Нажатие на кнопку "Добавить поздравление"
  submit()
  {
    // Если нет авторизации
    if (!this.authService.isAuth) {
      this.router.goToLoginPage();
    }

    // Если форма неправильно заполнена
    if (this.form.invalid) {
      return;
    }

    // Разбивает строку на таги
    var tagStr = this.input_tags.value;
    if(tagStr != null)
    {
      var tagStr_ = tagStr.replace(/[~!@"'#$%^:;&?*()+=\s]/g, ' ');
      var arrayOfStrings = tagStr_.split(/[\s,]+/);
    }

    // Создает DTO поздравления
    const model: Partial<ICreateCongratulation> = {
      title: this.title.value,
      body: this.body.value,
      price: this.price.value,
      categoryId: +this.categoryId.value,
      regionId: this.regionId.value,
      address: this.address.value,
      tagBodies: arrayOfStrings,
      status: this.status.value,
      userFiles: this.userFiles
    };

    // Отправлет DTO поздравления на бэк
    this.congratulationService.create(new CreateCongratulation(model))
      .pipe(take(1)).subscribe((res) => {
        // Выдаёт всплывающее сообщение о результате
        this.toastService.show(
          'Поздравление успешено добавлено',
          {classname: 'bg-success text-light'});

        // Определяем идентификатор вновь созданного поздравления
        let id = JSON.parse(JSON.stringify(res)).id;
        
        // Переходит на страницу вновь созданного поздравления
        this.router.goToCongratulationPageById(id);
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