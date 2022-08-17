import { Component, OnInit } from '@angular/core';
import {cards, ICard} from "../../../instances/card/card-interface/icard";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-components-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  card: ICard | undefined;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {

    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('cardId'));

    // Find the product that correspond with the id provided in route.
    this.card = cards.find(card => card.id === productIdFromRoute);

  }

}
