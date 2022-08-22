import { Component, OnInit } from '@angular/core';
import {tags} from "../../../interfaces/tag/itag";

@Component({
  selector: 'app-right-column',
  templateUrl: './right-column.component.html',
  styleUrls: ['./right-column.component.css']
})
export class RightColumnComponent implements OnInit {
  tags = [...tags];
  constructor() { }

  ngOnInit(): void {
  }

}
