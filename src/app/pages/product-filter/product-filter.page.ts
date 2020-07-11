import { Component, OnInit, Input } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-product-filter",
  templateUrl: "./product-filter.page.html",
  styleUrls: ["./product-filter.page.scss"],
})
export class ProductFilterPage implements OnInit {
  @Input("sortType") sortType: any;

  constructor(private popover: PopoverController) {}

  ngOnInit() {}
  dismiss(sort) {
    this.popover.dismiss(sort);
  }
}
