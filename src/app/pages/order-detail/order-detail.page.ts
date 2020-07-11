import { UtilService } from "./../../service/util.service";
import { element } from "protractor";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { deepStrictEqual } from "assert";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.page.html",
  styleUrls: ["./order-detail.page.scss"]
})
export class OrderDetailPage implements OnInit {
  data: any = {};
  shopReview: any = {};
  itemReview: any = {};
  driverReview: any = {};
  itemtotal: any;
  total: any;
  item_review = 1;
  delivery_rate: any;
  rate = 0;
  err: any = {};
  currency: any;
  constructor(
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService,
    private translate: TranslateService
  ) {
    this.currency = this.api.currency;
    this.util.startLoad();

    this.api.getDataWithToken("singleOrder/" + this.api.orderID).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.data = res.data;

          this.itemtotal = 0;
          this.data.orderItems.forEach(element => {
            this.itemtotal = this.itemtotal + element.price;
            this.data.item_review.forEach(elreview => {
              if (element.item == elreview.item_id) {
                element.message = elreview.message;
                element.rate = elreview.rate;
              }
            });
          });
          if (res.data.shopReview_status) {
            this.shopReview = res.data.shop_review;
          }
          if (res.data.driverReview_status) {
            this.driverReview = res.data.driver_review;
          }
        }
      },
      err => {
        this.util.dismissLoader();
        this.err = err;
      }
    );
  }

  ngOnInit() {}
  back() {
    this.ntrl.back();
  }

  onSubmit(item) {
    this.itemReview.itemData = [];
    item.forEach(element => {
      if (element.package_id) {
        let pusher: any = {
          item_id: "",
          rate: element.rate,
          message: element.message,
          package_id: element.package_id
        };
        this.itemReview.itemData.push(pusher);
      } else {
        let pusher: any = {
          item_id: element.item,
          rate: element.rate,
          message: element.message,
          package_id: ""
        };
        this.itemReview.itemData.push(pusher);
      }
    });

    this.itemReview.order_id = this.data.id;
    this.itemReview.customer_id = this.data.customer_id;

    this.api
      .postDataWithToken("addItemReview", this.itemReview)
      .subscribe((res: any) => {
        if (res.success) {
          this.translate.get('toasts').subscribe(async val => {  
            this.util.presentToast(val.review_add_success);
          })
          this.data.review_status = 1;
        }
      });
  }
  shopReiviewData(item) {
    this.shopReview.order_id = this.data.id;
    this.shopReview.customer_id = this.data.customer_id;
    this.shopReview.shop_id = this.data.shop_id;
    this.api
      .postDataWithToken("addShopReview", this.shopReview)
      .subscribe((res: any) => {
        if (res.success) {
          this.translate.get('toasts').subscribe(async val => {  
            this.util.presentToast(val.shop_review_add_success);
          })
          this.data.shopReview_status = 1;
        }
      });
  }
  orderStatus(id) {
    this.api.checkOrderStatus = id;
    this.ntrl.navigateForward("/timeline");
  }
  driverReviewData(item) {
    this.driverReview.order_id = this.data.id;
    this.driverReview.customer_id = this.data.customer_id;
    this.driverReview.deliveryBoy_id = this.data.deliveryBoy_id;
    this.api.postDataWithToken("addDriverReview", this.driverReview).subscribe(
      (res: any) => {
        if (res.success) {
          this.err = {};
          this.translate.get('toasts').subscribe(async val => {  
            this.util.presentToast(val.driver_review_add_success);
          })
          this.data.driverReview_status = 1;
        }
      },
      err => {
        this.err = err.error.errors;
      }
    );
  }
}
