import {Component, Input} from '@angular/core';
import {ICongratulation, congratulations} from "../../congratulation/icongratulation";

@Component({
  selector: 'app-card-pagination',
  templateUrl: './card-pagination.component.html',
  styleUrls: ['./card-pagination.component.css']
})
export class CardPaginationComponent {

  @Input() congratulations: ICongratulation[] | undefined;

  constructor() { }

}
