import { GroceryService } from "./../../service/grocery.service";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-store-detail",
  templateUrl: "./store-detail.page.html",
  styleUrls: ["./store-detail.page.scss"],
})
export class StoreDetailPage implements OnInit {
  cartData: any = [];
  data: any = { product: [] };
  currency: any;
  term = "";
  dataa: any = [];
  state: any = 1;
  Store: any = [];
  id: any;
  constructor(
    private nav: NavController,
    private api: ApiService,
    private util: UtilService,
    private gpi: GroceryService
  ) {
    this.currency = this.api.currency;

    this.dataa = JSON.parse(localStorage.getItem("store-detail"));

    this.util.startLoad();
    this.api
      .getDataWithToken("groceryShopDetail/" + this.gpi.storeID)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.data = res.data;

            this.api
              .getDataWithToken("groceryShopCategory/" + this.gpi.storeID)
              .subscribe(
                (res: any) => {
                  if (res.success) {
                    this.data.category = res.data;
                    this.api
                      .getDataWithToken("groceryItem/" + this.gpi.storeID)
                      .subscribe(
                        (res: any) => {
                          if (res.success) {
                            this.util.dismissLoader();
                            this.data.product = res.data;
                            this.id = res.data.id;
                            this.data.product.forEach((element) => {
                              element.qty = 0;
                              if (this.cartData.length > 0) {
                                const fCart = this.cartData.find(
                                  (x) => x.id == element.id
                                );
                                if (fCart) {
                                  element.qty = fCart.qty;
                                }
                              }
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
                }
              );
          }
        },
        (err) => {
          this.util.dismissLoader();
        }
      );
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

  ngOnInit() {}
  viewMore() {
    this.nav.navigateForward("product");
  }
  subcategory(id) {
    this.gpi.catId = id;
    this.nav.navigateForward("/category-detail");
  }

  cart() {
    if (this.cartData.length == 0) {
      this.util.presentToast("cart is empty");
    } else {
      this.gpi.cartData = this.cartData;
      this.nav.navigateForward("/grocery-cart");
    }
  }
  ionViewWillLeave() {
    this.gpi.cartData = this.cartData;
  }
  storeDetail(id) {
    this.gpi.itemId = id;
    this.nav.navigateForward("/product-detail");
  }
  ionViewWillEnter() {
    this.cartData = JSON.parse(localStorage.getItem("store-detail")) || [];

    if (this.cartData.length > 0) {
      if (this.data.product.length > 0) {
        this.data.product.forEach((el1) => {
          const fCart = this.cartData.find((x) => x.id == el1.id);
          if (fCart) {
            el1.qty = fCart.qty;
          } else {
            el1.qty = 0;
          }
        });
      }
    } else {
      this.data.product.forEach((el1) => {
        el1.qty = 0;
      });
    }
  }

  logScrolling(ev) {
    if (ev.detail.scrollTop >= 100) {
      this.state = 2;
    } else {
      this.state = 1;
    }
  }
}
