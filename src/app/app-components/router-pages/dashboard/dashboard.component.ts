import {ChangeDetectorRef, Component, HostListener, ViewChild} from '@angular/core';
import {congratulations} from "../../../interfaces/congratulation/icongratulation";
import {VirtualScrollerComponent} from "ngx-virtual-scroller";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  // Относительные размеры области Virtual Scroller
  k_height = 1;
  k_width = 0.5;

  // Хранит размеры области Virtual Scroller
  viewVirtualScrollerAreaHeight: any;
  viewVirtualScrollerAreaWidth: any;

  congratulations = [...congratulations];

  @ViewChild('scroll') scroller: VirtualScrollerComponent;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(){
    // Обновляет размеры карточки в соответсвии с размером экрана
    this.viewVirtualScrollerAreaHeight = window.innerHeight*this.k_height;
    this.viewVirtualScrollerAreaWidth = window.innerWidth*this.k_width;
  }

  // Обработка события изменения размера главного окна
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.viewVirtualScrollerAreaHeight = event.target.innerHeight*this.k_height;
    this.viewVirtualScrollerAreaWidth = event.target.innerWidth*this.k_width;
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
