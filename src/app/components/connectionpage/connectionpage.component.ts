import { Component, OnInit } from '@angular/core';

// The @Component decorator identifies the class immediately below it as a component class, and specifies its metadata.
@Component({
  selector: 'app-connectionpage',
  templateUrl: './connectionpage.component.html',
  styleUrls: ['./connectionpage.component.scss']
})
export class ConnectionpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
