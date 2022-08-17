import {Component, Input} from '@angular/core';
import {ICard} from "../card-interface/icard";

@Component({
  selector: 'app-card-view-low-details',
  templateUrl: './card-view-low-details.component.html',
  styleUrls: ['./card-view-low-details.component.css']
})
export class CardViewLowDetailsComponent {
  @Input() card: ICard | undefined;
  constructor() { }

}
