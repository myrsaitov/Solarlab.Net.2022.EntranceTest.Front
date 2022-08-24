import { Component, Input } from '@angular/core';
import { IComment } from '../../models/comment/i-comment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { RouterService } from 'src/app/services/router.service';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})

export class CommentCardComponent {
  form: FormGroup;
  @Input() comment: IComment;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly toastService: ToastService,
    private readonly router: RouterService,
    private readonly commentService: CommentService) {
}

  // Удаляет комментарий
  delete_comment(){
    this.commentService.delete(1).pipe().subscribe(() => {
      this.toastService.show('Комментарий успешено удален', {classname: 'bg-success text-light'});
    });
  }

}