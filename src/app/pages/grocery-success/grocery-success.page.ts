import { ModalController, NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grocery-success",
  templateUrl: "./grocery-success.page.html",
  styleUrls: ["./grocery-success.page.scss"],
})
export class GrocerySuccessPage implements OnInit {
  constructor(
    private modalController: ModalController,
    private nav: NavController
  ) { }

  ngOnInit() { }
  orderStatus() {
    localStorage.removeItem('store-detail')
    this.modalController.dismiss();
    this.nav.navigateRoot("grocery-status");
  }
}
