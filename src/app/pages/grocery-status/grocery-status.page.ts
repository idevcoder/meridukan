import { GroceryService } from "./../../service/grocery.service";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grocery-status",
  templateUrl: "./grocery-status.page.html",
  styleUrls: ["./grocery-status.page.scss"],
})
export class GroceryStatusPage implements OnInit {
  status: any;
  data: any = {};
  get_duration_interval: any;
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService,
    private gpi: GroceryService
  ) {
    this.util.startLoad();
    this.api
      .getDataWithToken("trackGroceryOrder/" + this.gpi.orderId)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.data = res.data;
            this.util.dismissLoader();
            if (
              this.data.order_status == "Pending" ||
              this.data.order_status == "Approved"
            ) {
              this.status = 0;
            } else if (this.data.order_status == "DriverApproved") {
              this.status = 1;
            } else if (
              this.data.order_status == "OrderReady" ||
              this.data.order_status == "PickUpGrocery"
            ) {
              this.status = 2;
            } else if (this.data.order_status == "OutOfDelivery") {
              this.status = 3;
            } else if (this.data.order_status == "DriverReach") {
              this.status = 4;
            } else {
              if (this.data.order_status != "Cancel") {
                this.status = 5;
              }
            }
          }
        },
        (err) => {
          this.util.dismissLoader();
          this.util.presentToast("something went wrong");
        }
      );
    this.get_duration_interval = setInterval((interval) => {
      if (this.data.order_status == "Delivered") {
        clearInterval(this.get_duration_interval);
      } else {
        this.getlocation();
      }
    }, this.api.request_duration);
  }

  ngOnInit() {}
  orderStatus() {
    this.nav.navigateForward("grocery-order-detail");
  }

  getlocation() {
    this.api
      .getDataWithToken("trackGroceryOrder/" + this.gpi.orderId)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.data = res.data;
            if (
              this.data.order_status == "Pending" ||
              this.data.order_status == "Approved"
            ) {
              this.status = 0;
            } else if (this.data.order_status == "DriverApproved") {
              this.status = 1;
            } else if (
              this.data.order_status == "OrderReady" ||
              this.data.order_status == "PickUpGrocery"
            ) {
              this.status = 2;
            } else if (this.data.order_status == "OutOfDelivery") {
              this.status = 3;
            } else if (this.data.order_status == "DriverReach") {
              this.status = 4;
            } else {
              if (this.data.order_status == "Delivered") {
                this.status = 5;
              }
            }
          }
        },
        (err) => {
          this.util.dismissLoader();
          this.util.presentToast("something went wrong");
        }
      );
  }
}
