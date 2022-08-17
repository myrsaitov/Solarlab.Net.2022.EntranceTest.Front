import {Component, Input} from '@angular/core';
import {ICard} from "../../../../interfaces/icard";

@Component({
  selector: 'app-card-view-high-details',
  templateUrl: './card-view-high-details.component.html',
  styleUrls: ['./card-view-high-details.component.css']
})
export class CardViewHighDetailsComponent {
  @Input() card: ICard | undefined;

  constructor() {}

}
