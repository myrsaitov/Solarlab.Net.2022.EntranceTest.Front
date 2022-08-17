import {Component, Input} from '@angular/core';
import {ICard, cards} from "../../../../interfaces/icard";

@Component({
  selector: 'app-card-pagination',
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.css']
})
export class CardPaginationComponent {

  @Input() cards: ICard[] | undefined;

  constructor() { }

}
