import { GroceryService } from "./../../service/grocery.service";
import { ApiService } from "./../../service/api.service";
import { UtilService } from "./../../service/util.service";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { OtpmodalpagePage } from "../otpmodalpage/otpmodalpage.page";

@Component({
  selector: "app-grocery-order-detail",
  templateUrl: "./grocery-order-detail.page.html",
  styleUrls: ["./grocery-order-detail.page.scss"],
})
export class GroceryOrderDetailPage implements OnInit {
  data: any = {};
  err: any = {};
  currency: any;
  itemtotal: any;
  shopReview: any = {};
  status: any;
  constructor(
    private util: UtilService,
    private api: ApiService,
    private gpi: GroceryService,
    private modalController: ModalController
  ) {
    this.currency = this.api.currency;
    this.util.startLoad();
    this.api
      .getDataWithToken("singleGroceryOrder/" + this.gpi.orderId)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.data = res.data;
            this.itemtotal = 0;
            this.data.orderItems.forEach((element) => {
              this.itemtotal = this.itemtotal + element.price;
              this.util.dismissLoader();
            });
            if (this.data.review) {
              this.shopReview.rate = this.data.review.rate;
              this.shopReview.message = this.data.review.message;
            }
          }
        },
        (err) => {
          this.util.dismissLoader();
        }
      );
  }

  async pickupFood(id?) {
    this.api.order_id = id;
    const modal = await this.modalController.create({
      component: OtpmodalpagePage,
      cssClass: "otp-modal",
    });
    modal.onDidDismiss().then(async (data) => {
      if (data["data"] == "true") {
        this.data.order_status = "Delivered";
      }
    });
    return await modal.present();
  }

  ngOnInit() {}
  shopReiviewData() {
    this.shopReview.order_id = this.data.id;
    this.shopReview.customer_id = this.data.customer.id;
    this.shopReview.shop_id = this.data.shop_id;

    this.util.startLoad();
    this.api.postDataWithToken("addGroceryReview", this.shopReview).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.presentToast("Thanks for review");
          this.api
            .getDataWithToken("singleGroceryOrder/" + this.gpi.orderId)
            .subscribe(
              (res: any) => {
                if (res.success) {
                  this.data = res.data;
                  this.itemtotal = 0;
                  this.status = res.data.order_status;
                  this.data.orderItems.forEach((element) => {
                    this.itemtotal = this.itemtotal + element.price;

                    this.util.dismissLoader();
                  });
                }
              },
              (err) => {
                this.util.dismissLoader();
              }
            );
        }
      },
      (err) => {
        this.util.dismissLoader();
        this.util.presentToast("something went wrong");
      }
    );
  }
}
