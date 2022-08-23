import {ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {tags} from "../../../interfaces/tag/itag";
import {VirtualScrollerComponent} from "ngx-virtual-scroller";

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.css']
})
export class RightColumnComponent implements OnInit {

  // Относительные размеры области Virtual Scroller
  k_height = 1;
  k_width = 0.2;

  // Хранит размеры области Virtual Scroller
  viewVirtualScrollerAreaHeight: any;
  viewVirtualScrollerAreaWidth: any;

  @ViewChild('scroll') scroller: VirtualScrollerComponent;

  tags = [...tags];
  constructor(private cd: ChangeDetectorRef) { }

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
