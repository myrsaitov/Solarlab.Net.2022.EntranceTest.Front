import { Component, OnInit } from '@angular/core';
import {congratulations, ICongratulation} from "../../../interfaces/congratulation/icongratulation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  congratulation: ICongratulation;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('cardId'));

    // Find the product that correspond with the id provided in route.
    //this.congratulation = congratulations.find(congratulation => congratulation.id === productIdFromRoute);

  }

}
