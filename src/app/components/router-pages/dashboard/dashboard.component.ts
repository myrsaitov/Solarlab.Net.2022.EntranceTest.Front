import { Component, OnInit } from '@angular/core';
import {cards} from "../../../interfaces/icard";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cards = [...cards];

  constructor() { }

  ngOnInit(): void {
  }

}
