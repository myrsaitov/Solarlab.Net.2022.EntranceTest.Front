import {Component, Input} from '@angular/core';
import {ICongratulation} from "../../congratulation/icongratulation";

@Component({
  selector: 'app-card-view-low-details',
  templateUrl: './card-view-low-details.component.html',
  styleUrls: ['./card-view-low-details.component.css']
})
export class CardViewLowDetailsComponent {
  @Input() congratulation: ICongratulation | undefined;

}
