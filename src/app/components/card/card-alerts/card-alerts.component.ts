import {Component, EventEmitter, Input, Output} from '@angular/core';
import { ICard } from 'src/app/models/card';


@Component({
  selector: 'app-card-alerts',
  templateUrl: './card-alerts.component.html',
  styleUrls: ['./card-alerts.component.css']
})
export class CardAlertsComponent {

  @Input() card: ICard | undefined;
  @Output() notify = new EventEmitter();

}
