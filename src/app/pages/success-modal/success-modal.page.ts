import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { modalController } from "@ionic/core";

@Component({
  selector: "app-success-modal",
  templateUrl: "./success-modal.page.html",
  styleUrls: ["./success-modal.page.scss"]
})
export class SuccessModalPage implements OnInit {
  constructor(private ntrl: NavController) {}

  ngOnInit() {}
  orderStatus() {
    modalController.dismiss();
    this.ntrl.navigateRoot(["timeline"]);
  }
}
