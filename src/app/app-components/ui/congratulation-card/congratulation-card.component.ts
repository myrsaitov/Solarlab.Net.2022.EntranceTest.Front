import {Component, Input} from '@angular/core';
import {ICongratulation} from "../../../interfaces/congratulation/icongratulation";

@Component({
  selector: 'app-congratulation-card',
  templateUrl: './congratulation-card.component.html',
  styleUrls: ['./congratulation-card.component.css']
})
export class CongratulationCardComponent {

  @Input() congratulation: ICongratulation;

}
