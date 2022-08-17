import { Component, OnInit } from '@angular/core';
import {cards} from "../../../instances/card/card-interface/icard";

@Component({
  selector: 'app-components-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards = [...cards];

  constructor() { }

  ngOnInit(): void {
  }

}
