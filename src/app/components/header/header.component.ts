import {AuthService} from '../../services/auth.service';
import {Component} from '@angular/core';
import {TagService} from '../../services/tag.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
// ntcn
export class HeaderComponent {
  form: FormGroup;
  isAuth$ = this.authService.isAuth$;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly tagService: TagService,
    private readonly router: RouterService) {
  }


  ngOnInit() {

    // Валидаторы формы
    this.form = this.fb.group({
      searchStr: ['', Validators.required]
    });
  }

  userName(){
    return this.authService.getUserName();
  }

  logout() {
    this.router.goToLoginPage();
    this.authService.deleteSession();
  }

  // Обработка поиска по строке
  get searchStr() {
    return this.form.get('searchStr');
  }

  onKeyDownEnter(){
    this.router.getCongratulationsBySearchStr(this.searchStr.value);
  }

}