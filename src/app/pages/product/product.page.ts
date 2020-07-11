import { GroceryService } from "./../../service/grocery.service";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { ProductFilterPage } from "./../product-filter/product-filter.page";
import { NavController, PopoverController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product",
  templateUrl: "./product.page.html",
  styleUrls: ["./product.page.scss"],
})
export class ProductPage implements OnInit {
  Store: any = [];
  currency: any;
  data: any = [];
  cartData: any = [];
  sortType: any = "lowtohigh";
  constructor(
    private nav: NavController,
    private popoverController: PopoverController,
    private api: ApiService,
    private util: UtilService,
    private gpi: GroceryService
  ) {
    this.currency = this.api.currency;

    this.data = JSON.parse(localStorage.getItem("store-detail"));
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.util.startLoad();
    this.api.getDataWithToken("groceryItem/" + this.gpi.storeID).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.Store = res.data;
          console.log(this.Store);

          this.cartData = this.gpi.cartData;
          this.getdata();
        }
      },
      (err) => {
        this.util.dismissLoader();
      }
    );
  }
  storeDetail(id) {
    this.gpi.itemId = id;
    this.nav.navigateForward("/product-detail");
  }
  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ProductFilterPage,
      componentProps: {
        sortType: this.sortType,
      },
      cssClass: "product_filter",
      event: ev,
      backdropDismiss: false,
      translucent: true,
    });
    popover.onWillDismiss().then((res) => {
      if (res.data) {
        if (res.data == "hightolow") {
          this.Store.sort((a, b) => (a.sell_price < b.sell_price ? 1 : -1));
          this.sortType = "hightolow";
        } else {
          this.Store.sort((a, b) => (a.sell_price > b.sell_price ? 1 : -1));
          this.sortType = "lowtohigh";
        }
      }
    });
    return await popover.present();
  }
  getdata() {
    if (this.gpi.cartData) {
      if (this.gpi.cartData.length >= 0) {
        if (this.Store) {
          this.cartData =
            JSON.parse(localStorage.getItem("store-detail")) || [];
          this.Store.forEach((el1) => {
            el1.qty = 0;
            const fCart = this.cartData.find((x) => x.id == el1.id);
            if (fCart) {
              el1.qty = fCart.qty;
            }
          });
        }
      } else {
        this.Store.forEach((el1) => {
          el1.qty = 0;
        });
      }
    } else {
      this.Store.forEach((element) => {
        element.qty = 0;
      });
    }
  }
  AddCart(item) {
    item.qty = item.qty + 1;
    item.total = item.qty * item.sell_price;
    this.cartData = JSON.parse(localStorage.getItem("store-detail")) || [];

    const fCart = this.cartData.find((x) => x.id == item.id);

    if (fCart) {
      fCart.qty = item.qty;
    } else {
      this.cartData.push(item);
    }
    localStorage.setItem("store-detail", JSON.stringify(this.cartData));
  }
  remove(item) {
    let equalIndex;
    if (item.qty == 0) return;
    item.qty = item.qty - 1;

    if (item.qty == 0) {
      const i = this.cartData.findIndex((x) => x.id == item.id);

      this.cartData.splice(i, 1);
    } else {
      item.total = item.qty * item.sell_price;
      this.cartData = JSON.parse(localStorage.getItem("store-detail")) || [];
      const fCart = this.cartData.find((x) => x.id == item.id);
      if (fCart) {
        fCart.qty = item.qty;
      }
    }

    localStorage.setItem("store-detail", JSON.stringify(this.cartData));
  }
  cart() {
    if (this.cartData.length == 0) {
      this.util.presentToast("cart is empty");
    } else {
      this.gpi.cartData = this.cartData;
      this.nav.navigateForward("/grocery-cart");
    }
  }
}
