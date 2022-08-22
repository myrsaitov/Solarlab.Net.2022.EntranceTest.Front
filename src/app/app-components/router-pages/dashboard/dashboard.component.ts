import {ChangeDetectorRef, Component, HostListener, ViewChild} from '@angular/core';
import {congratulations} from "../../../interfaces/congratulation/icongratulation";
import {VirtualScrollerComponent} from "ngx-virtual-scroller";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Хранит размеры карточки
  viewCardHeight: any;
  viewCardWidth: any;

  congratulations = [...congratulations];

  @ViewChild('scroll') scroller: VirtualScrollerComponent;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(){
    // Обновляет размеры карточки в соответсвии с размером экрана
    this.viewCardHeight = window.innerHeight*0.7;
    this.viewCardWidth = window.innerWidth*0.5;
  }

  // Обработка события изменения размера главного окна
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewCardHeight = event.target.innerHeight*0.7;
    this.viewCardWidth = event.target.innerWidth*0.5;;
  }

  onVsUpdate(event) {
    console.log('vs update', event);
  }

  onVsChange(event) {
    console.log('vs change', event);
  }

  onVsStart(event) {
    console.log('vs start', event);
  }

  onVsEnd(event) {
    console.log('vs end', event);
  }

}
