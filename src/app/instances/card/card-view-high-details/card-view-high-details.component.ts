import {Component, Input} from '@angular/core';
import {ICard} from "../card-interface/icard";

@Component({
  selector: 'app-components-card-view-high-details',
  templateUrl: './card-view-high-details.component.html',
  styleUrls: ['./card-view-high-details.component.css']
})
export class CardViewHighDetailsComponent {
  @Input() card: ICard | undefined;

  constructor() {}

}
