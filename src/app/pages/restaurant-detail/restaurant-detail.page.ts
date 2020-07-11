import { AddAddressPage } from "./../add-address/add-address.page";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import {
  PopoverController,
  NavController,
  ModalController
} from "@ionic/angular";
import { PopoverPage } from "../popover/popover.page";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-restaurant-detail",
  templateUrl: "./restaurant-detail.page.html",
  styleUrls: ["./restaurant-detail.page.scss"]
})
export class RestaurantDetailPage implements OnInit {
  cartData: any = [];
  totalPrice: any = 0;
  totalItem: any = 0;
  bookmarkData: any = {};
  data: any = {};
  state: any = 1;
  vegonly: any = true;
  nonVeg: any = true;
  tempData: any;
  currency: any;
  constructor(
    private popoverController: PopoverController,
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService,
    private modalController: ModalController,
    private translate: TranslateService
  ) {
    this.currency = this.api.currency;
    this.util.startLoad();
    this.api
      .getDataWithToken("shopDetail/" + this.api.detailId)
      .subscribe((res: any) => {
        if (res.success) {
          this.data = res.data;

          this.data.bestSeller.forEach(element => {
            element.qty = 0;
            element.type = "item";
          });
          this.data.combo.forEach(ele => {
            ele.qty = 0;
            ele.type = "combo";
          });

          this.tempData = res.data.bestSeller;
          this.api.menu = res.data.menu;
          this.util.dismissLoader();
        }
      });
  }

  ionViewWillEnter() {
    this.getCartdata();
    if (this.api.cartData.cartDetail) {
      if (this.api.cartData.cartDetail.length >= 0) {
        if (this.data.bestSeller) {
          this.data.bestSeller.forEach(el1 => {
            let status = true;
            this.api.cartData.cartDetail.forEach(el2 => {
              if (el1.id == el2.id && el1.type == el2.type) {
                el1.qty = el2.qty;
              } else {
                status = false;
              }
            });
          });
        }
      } else {
        this.data.bestSeller.forEach(el1 => {
          el1.qty = 0;
        });
        this.data.combo.forEach(element => {
          element.qty = 0;
        });
      }
    }
  }

  ngOnInit() {}
  logScrolling(ev) {
    if (ev.detail.scrollTop >= 150) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverPage,
      event: ev,
      translucent: true,
      backdropDismiss: true,
      cssClass: "popover"
    });
    return await popover.present();
  }

  Gotocart() {
    if (this.cartData.length) {
      if (localStorage.getItem("isaddress") == "false") {
        this.addAddress();
      } else {
        this.ntrl.navigateForward(["cart"]);
      }
    } else {
      this.translate.get('toasts').subscribe(async val => {  
        this.util.presentToast(val.cart_empty);
      })
    }
  }

  back() {
    this.ntrl.back();
  }

  goReview() {
    this.ntrl.navigateForward(["review"]);
  }

  addtocart(item) {
    item.qty += 1;
    item.total;
    if (this.cartData.length > 0) {
      let equalIndex;
      let equalType;
      this.cartData.forEach((element, ind) => {
        if (element.id == item.id && element.type == item.type) {
          equalIndex = ind;
          equalType = item.type;
        }
      });
      if (equalIndex >= 0 && equalType) {
        this.cartData[equalIndex] = item;
        item.total = item.qty * item.price;
      } else {
        this.cartData.push(item);
        item.total = item.price;
      }
    } else {
      this.cartData.push(item);
      item.total = item.price;
    }
    this.getCartdata();
    this.api.cartData = this.data;
    this.api.cartData.cartDetail = this.cartData;
  }

  minusQty(item) {
    if (item.qty !== 0) {
      item.qty--;
      if (this.cartData.length > 0) {
        let equalIndex;
        let equalType;
        this.cartData.forEach((element, ind) => {
          if (element.id == item.id && element.type == item.type) {
            equalIndex = ind;
            equalType = item.type;
          }
        });
        if (equalIndex >= 0 && equalType) {
          if (item.qty == 0) {
            this.cartData.splice(equalIndex, 1);
          } else {
            this.cartData[equalIndex] = item;
            item.total = item.qty * item.price;
          }
        }
      }
    }

    this.getCartdata();
    this.api.cartData.cartDetail = this.cartData;
  }

  getCartdata() {
    this.totalPrice = 0;
    this.totalItem = 0;
    this.cartData.forEach(element => {
      this.totalPrice = parseFloat(this.totalPrice) + parseFloat(element.total);
      this.totalItem = parseFloat(this.totalItem) + parseFloat(element.qty);
    });
  }

  itemReview(id) {
    this.api.reviewId = id;
    this.ntrl.navigateForward("/item-review");
  }

  addBookmark() {
    this.bookmarkData.shop_id = this.data.id;

    this.api
      .postDataWithToken("addBookmark", this.bookmarkData)
      .subscribe((res: any) => {
        if (res.success) {
          if (this.data.favourite) {
            this.data.favourite = false;
            this.util.presentToast(res.msg);
          } else {
            this.data.favourite = true;
            this.util.presentToast(res.msg);
          }
        }
      });
  }

  async addAddress() {
    const modal = await this.modalController.create({
      component: AddAddressPage
    });
    return await modal.present();
  }

  vegOnlyItem() {
    if (this.vegonly == false || this.nonVeg == false) {
      this.data.bestSeller = this.tempData;
      if (this.vegonly == false) {
        this.data.bestSeller = this.data.bestSeller.filter(a => {
          if (a.isVeg == 0) {
            return a;
          }
        });
      }
      if (this.nonVeg == false) {
        this.data.bestSeller = this.data.bestSeller.filter(a => {
          if (a.isVeg > 0) {
            return a;
          }
        });
      }
    } else {
      this.data.bestSeller = this.tempData;
    }
  }
}
