import { Component, OnInit } from '@angular/core';
import {congratulations} from "../../../../interfaces/congratulation/icongratulation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  congratulations = [...congratulations];

  constructor() {  }

  ngOnInit(): void {
  }

}
