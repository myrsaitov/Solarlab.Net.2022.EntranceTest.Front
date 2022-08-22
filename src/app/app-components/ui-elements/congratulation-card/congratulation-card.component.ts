import { Component, Input } from "@angular/core";

@Component({
  selector: "congratulation-card",
  templateUrl: "./congratulation-card.component.html",
  styleUrls: ["./congratulation-card.component.css"]
})
export class CongratulationCardComponent {
  @Input() account: any;
}
