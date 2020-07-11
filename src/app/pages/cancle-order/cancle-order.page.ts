import { Component, OnInit } from "@angular/core";
import { NavController, ModalController, NavParams } from "@ionic/angular";

@Component({
  selector: "app-cancle-order",
  templateUrl: "./cancle-order.page.html",
  styleUrls: ["./cancle-order.page.scss"]
})
export class CancleOrderPage implements OnInit {
  cancleDate: any = [
    "I want to change detail of this order.",
    "The Rider is too long to be appointed.",
    "I dont't need this order.",
    "Rider behavior not good.",
    "Fare issue.",
    "Other"
  ];

  constructor(private nav: NavController, private modal: ModalController) {}

  ngOnInit() {}

  change() {
    this.modal.dismiss();
    this.nav.navigateForward("home");
  }
}
