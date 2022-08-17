import { Component, OnInit } from '@angular/core';
import {tags} from "../instances/tag/tag-interface/itag";

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
