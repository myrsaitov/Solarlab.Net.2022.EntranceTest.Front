import {Component, Input} from '@angular/core';
import {ICongratulation} from "../../congratulation/icongratulation";

@Component({
  selector: 'app-card-view-high-details',
  templateUrl: './card-view-high-details.component.html',
  styleUrls: ['./card-view-high-details.component.css']
})
export class CardViewHighDetailsComponent {
  @Input() congratulation: ICongratulation | undefined;

  constructor() {}

}
