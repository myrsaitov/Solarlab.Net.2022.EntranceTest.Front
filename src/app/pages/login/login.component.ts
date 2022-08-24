import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ILogin} from 'src/app/models/account/login.model';
import { UserService } from 'src/app/services/user.service';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  notloginedstatus = false;
  passwordHide : boolean = true; // Показать/спрятать пароль

  private formObj = {
    eMail: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(6),Validators.min(20)]],
    rememberMe: [false]
  };

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder) {
    this.loginForm = fb.group(this.formObj);
  }

  ngOnInit() {
  }

  get eMail() {
    return this.loginForm.get('eMail');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Обработка нажатия галочки "Показать пароль"
  onCheckboxChange(event: any) {
    this.passwordHide = !this.passwordHide;
  }

  // Обработка нажатия кнопки "Войти"
  public submit() {

    // Проверка валидности формы
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    // Загрузить данные с формы
    const payload: ILogin = this.loginForm.getRawValue();

    // Отправляет данные с формы на бэк,
    // если удачно, то статус НЕавторизации присваивает false
    this.userService.login(payload).subscribe(res => {
      this.notloginedstatus = !res;
    });
  }

}