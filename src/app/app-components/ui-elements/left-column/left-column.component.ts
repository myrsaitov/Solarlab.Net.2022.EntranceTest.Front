import {ChangeDetectorRef, Component, HostListener, ViewChild} from '@angular/core';
import {categories} from "../../../interfaces/category/icategory";
import {VirtualScrollerComponent} from "ngx-virtual-scroller";

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent {

  // Относительные размеры области Virtual Scroller
  k_height = 1;
  k_width = 0.2;

  // Хранит размеры области Virtual Scroller
  viewVirtualScrollerAreaHeight: any;
  viewVirtualScrollerAreaWidth: any;

  @ViewChild('scroll') scroller: VirtualScrollerComponent;

  categories = [...categories];

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
