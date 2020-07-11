import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController, ModalController } from "@ionic/angular";
import { SuccessModalPage } from "../success-modal/success-modal.page";
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from "@ionic-native/paypal/ngx";
import { TranslateService } from '@ngx-translate/core';

declare var RazorpayCheckout: any;
@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.page.html",
  styleUrls: ["./payment-method.page.scss"]
})
export class PaymentMethodPage implements OnInit {
  err: any;
  razor_key: any;
  data: any = {
    itemData: [],
    items: [],
    package_id: []
  };
  online = 1;
  cash = 0;
  paypalProductionkey: any;
  paypalSanboxkey: any;
  paypalPayment = 0;
  razorPayment = 1;
  currencyType: any;
  constructor(
    private ntrl: NavController,
    private modalController: ModalController,
    private api: ApiService,
    private util: UtilService,
    private payPal: PayPal,
    private translate: TranslateService
  ) {
    this.currencyType = this.api.currencyType;
    this.util.startLoad();
    this.api.getDataWithToken("keySetting").subscribe((res: any) => {
      if (res.success) {
        this.razor_key = res.data.razorPublishKey;
        this.paypalProductionkey = res.data.paypalProduction;
        this.paypalSanboxkey = res.data.paypalSendbox;
        this.util.dismissLoader();
      }
    });
  }

  ngOnInit() {}
  paymentMethod() {
    this.data.items = [];
    this.data.package_id = [];
    this.data.itemData = [];
    this.data.shopName = this.api.cartData.name;
    this.data.shop_id = this.api.cartData.id;
    this.data.payment = this.api.cartData.toPay;
    this.data.discount = this.api.cartData.discount;
    this.data.shop_charge = this.api.cartData.rastaurant_charge;
    this.data.delivery_charge = this.api.cartData.delivery_charge;
    this.data.coupon_price = this.api.cartData.discount;
    this.data.coupon_id = this.api.promocode.id;

    if (typeof this.data.items == "string") {
      this.data.items = [];
      this.data.package_id = [];
    }
    this.api.cartData.cartData.forEach(element => {
      if (element.type == "combo") {
        this.data.package_id.push(element.id);
        let pusher: any = {
          item: "",
          price: element.total,
          quantity: element.qty,
          package_id: element.id
        };
        this.data.itemData.push(pusher);
      } else {
        this.data.items.push(element.id);
        let pusher: any = {
          item: element.id,
          price: element.total,
          quantity: element.qty,
          package_id: ""
        };
        this.data.itemData.push(pusher);
      }
    });
    this.data.items = this.data.items.join();
    this.data.package_id = this.data.package_id.join();

    if (this.online) {
      localStorage.setItem("payment_type", "online");
      if (this.razorPayment) {
        this.payWithRazor();
      } else {
        if (this.currencyType == "INR") {
          this.translate.get('toasts').subscribe(async val => {  
            this.util.presentToast(val.payment_not_possible);
          })
        } else {
          this.paypalPay();
        }
      }
    } else {
      localStorage.setItem("payment_type", "cash");

      this.data.payment_status = 0;
      this.data.payment_type = "LOCAL";

      this.util.startLoad();
      this.api.postDataWithToken("createOrder", this.data).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.promocode = {};
            this.util.dismissLoader();
            this.api.checkOrderStatus = res.data.id;
            this.presentModal();
          }
        },
        err => {
          this.err = err.error.errors;
          this.util.dismissLoader();
        }
      );
    }
  }
  back() {
    this.ntrl.back();
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalPage,
      backdropDismiss: false,
      cssClass: "SuccessModal"
    });
    return await modal.present();
  }
  payWithRazor() {
    var options = {
      description: "Credits towards consultation",
      image: "http://placehold.it/96x96.png",
      currency: this.currencyType,
      key: this.razor_key,
      amount: this.data.payment * 100,
      name: "irest",
      prefill: {
        email: "admin@enappd.com",
        contact: "9621323231",
        name: "Enappd"
      },
      theme: {
        color: "#94b92d"
      },
      modal: {
        ondismiss: function() {
          alert("dismissed");
        }
      }
    };

    var successCallback = payment_id => {
      this.data.payment_token = payment_id;

      this.data.payment_status = 1;
      this.data.payment_type = "RAZOR";
      this.util.startLoad();
      this.api.postDataWithToken("createOrder", this.data).subscribe(
        (res: any) => {
          if (res.success) {
            this.api.promocode = {};
            this.util.dismissLoader();
            this.api.checkOrderStatus = res.data.id;
            this.presentModal();
          }
        },
        err => {
          this.err = err.error.errors;
          this.util.dismissLoader();
        }
      );
    };

    var cancelCallback = function(error) {
      alert(error.description + " (Error " + error.code + ")");
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  paypalPay() {
    this.payPal

      .init({
        PayPalEnvironmentProduction: this.paypalProductionkey,
        PayPalEnvironmentSandbox: this.paypalSanboxkey
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
                  this.data.payment,
                  this.currencyType,
                  "Description",
                  "sale"
                );
                this.payPal.renderSinglePaymentUI(payment).then(
                  result => {
                    this.data.payment_token = result.response.id;
                    this.data.payment_status = 1;
                    this.data.payment_type = "PAYPAL";
                    this.util.startLoad();
                    this.api
                      .postDataWithToken("createOrder", this.data)
                      .subscribe(
                        (res: any) => {
                          if (res.success) {
                            this.api.promocode = {};
                            this.util.dismissLoader();
                            this.api.checkOrderStatus = res.data.id;
                            this.presentModal();
                          }
                        },
                        err => {
                          this.err = err.error.errors;
                          this.util.dismissLoader();
                        }
                      );
                  },
                  e => {
                    console.log(e);
                  }
                );
              },
              e => {
                console.log(e);
              }
            );
        },
        e => {
          console.log(e);
        }
      );
  }
}
