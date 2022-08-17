import { Component } from '@angular/core';
import {categories} from "../instances/category/category-interface/icategory";

@Component({
  selector: 'app-left-column',
  templateUrl: './left-column.component.html',
  styleUrls: ['./left-column.component.css']
})
export class LeftColumnComponent {

  categories = [...categories];

  constructor() { }

}
