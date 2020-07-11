import { GrocerySuccessPage } from "./../grocery-success/grocery-success.page";
import { SuccessModalPage } from "./../success-modal/success-modal.page";
import { ModalController } from "@ionic/angular";
import { GroceryService } from "./../../service/grocery.service";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration,
} from "@ionic-native/paypal/ngx";
declare var RazorpayCheckout: any;
@Component({
  selector: "app-pay-method",
  templateUrl: "./pay-method.page.html",
  styleUrls: ["./pay-method.page.scss"],
})
export class PayMethodPage implements OnInit {
  currencyType: any;
  data: any = {};
  isOnlinePayment = false;
  online = 1;
  cash = 0;
  err: any;
  payment_type: any = "LOCAL";
  apdata: any = {};
  constructor(
    private api: ApiService,
    private util: UtilService,
    private gpi: GroceryService,
    private payPal: PayPal,
    private modalController: ModalController
  ) {
    this.apdata = this.gpi.info;

    this.currencyType = this.api.currencyType;

    this.util.startLoad();
    this.api.getDataWithToken("keySetting").subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        if(this.data.razor){
          this.isOnlinePayment = true;
        }
        else{
          this.online = 0;
        }
        this.util.dismissLoader();
      }
    });
  }

  ngOnInit() {}
  paymentMethod() {
    /* 
    return */
    let rdata: any = {};
    rdata.items = [];
    rdata.itemData = [];
    rdata.shop_id = this.gpi.storeID;
    rdata.payment = this.gpi.info.toPay;
    rdata.discount = this.gpi.info.discount;
    rdata.delivery_charge = this.gpi.info.delivery_charge;
    rdata.delivery_type = this.gpi.info.delivery_type;
    if (this.gpi.promocode == undefined) {
    } else {
      rdata.coupon_id = this.gpi.promocode.id;
    }
    rdata.coupon_price = this.gpi.info.discount;

    if (typeof this.data.items == "string") {
      rdata.items = [];
    }
    this.gpi.cartData.forEach((element) => {
      rdata.items.push(element.id);
      let pusher: any = {
        item_id: element.id,
        price: element.total * element.qty,
        quantity: element.qty,
      };
      rdata.itemData.push(pusher);
    });
    rdata.items = rdata.items.join();

    if (this.online) {
      if (this.payment_type == "RAZOR") {
        this.payWithRazor(rdata);
      } else {
        if (this.currencyType == "INR") {
          this.util.presentToast("payment not possible");
        } else {
          this.paypalPay(rdata);
        }
      }
    } else {
      rdata.payment_status = 0;
      rdata.payment_type = this.payment_type;
      this.util.startLoad();
      this.api.postDataWithToken("createGroceryOrder", rdata).subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            this.gpi.promocode = {};
            this.gpi.orderId = res.data.id;
            this.presentModal();
          }
        },
        (err) => {
          this.err = err.error.errors;
          this.util.dismissLoader();
        }
      );
    }
  }
  payWithRazor(rdata) {
    var options = {
      description: "Meri Dukan Order",
      image: "http://placehold.it/96x96.png",
      currency: this.currencyType,
      key: this.data.razorPublishKey,
      amount: this.gpi.info.toPay * 100,
      name: "Meri Dukan",

      theme: {
        color: "#94b92d",
      },
      modal: {
        ondismiss: function () {
          alert("dismissed");
        },
      },
    };

    var successCallback = (payment_id) => {
      rdata.payment_token = payment_id;
      rdata.payment_status = 1;
      rdata.payment_type = "RAZOR";
      this.util.startLoad();
      this.api.postDataWithToken("createGroceryOrder", rdata).subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            this.gpi.promocode = {};
            this.gpi.orderId = res.data.id;
            this.presentModal();
          }
        },
        (err) => {
          this.err = err.error.errors;
          this.util.dismissLoader();
        }
      );
    };

    var cancelCallback = function (error) {
      alert(error.description + " (Error " + error.code + ")");
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  paypalPay(rdata) {
    this.payPal

      .init({
        PayPalEnvironmentProduction: this.data.paypalProduction,
        PayPalEnvironmentSandbox: this.data.paypalSendbox,
      })

      .then(
        () => {
          this.payPal
            .prepareToRender(
              "PayPalEnvironmentSandbox",
              new PayPalConfiguration({})
            )
            .then(
              () => {
                let payment = new PayPalPayment(
                  this.gpi.info.toPay,
                  this.currencyType,
                  "Description",
                  "sale"
                );
                this.payPal.renderSinglePaymentUI(payment).then(
                  (result) => {
                    rdata.payment_token = result.response.id;
                    rdata.payment_status = 1;
                    rdata.payment_type = "PAYPAL";
                    this.util.startLoad();
                    this.api
                      .postDataWithToken("createGroceryOrder", rdata)
                      .subscribe(
                        (res: any) => {
                          if (res.success) {
                            this.util.dismissLoader();
                            this.gpi.promocode = {};
                            this.gpi.orderId = res.data.id;
                            this.presentModal();
                          }
                        },
                        (err) => {
                          this.err = err.error.errors;
                          this.util.dismissLoader();
                        }
                      );
                  },
                  (e) => {}
                );
              },
              (e) => {}
            );
        },
        (e) => {}
      );
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: GrocerySuccessPage,
      backdropDismiss: false,
      cssClass: "SuccessModal",
    });
    return await modal.present();
  }
}
