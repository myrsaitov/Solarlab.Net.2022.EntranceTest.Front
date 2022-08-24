import {Component, Input} from '@angular/core';
import {ICongratulation} from '../../models/congratulation/i-congratulation';
import {Router} from '@angular/router';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-congratulation-card',
  templateUrl: './congratulation-card.component.html',
  styleUrls: ['./congratulation-card.component.scss']
})

export class CongratulationCardComponent {
  @Input() congratulation: ICongratulation;
  @Input() defaultImageUri: string;
  @Input() regionName: string;

  constructor(
    private readonly router: Router) {
  }
}
