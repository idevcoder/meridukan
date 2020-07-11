import { GroceryService } from "./../../service/grocery.service";
import { UtilService } from "../../service/util.service";
import { ApiService } from "../../service/api.service";
import { Component } from "@angular/core";
import * as moment from "moment";
import {
  NativeGeocoder,
  NativeGeocoderResult,
  NativeGeocoderOptions,
} from "@ionic-native/native-geocoder/ngx";
import { ModalController, NavController, MenuController } from "@ionic/angular";
import { FilterPage } from "../filter/filter.page";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  cartData: any = [];
  data: any = { product: [] };
  term = "";
  dataa: any = [];
  Store: any = [];
  id: any;

  userAddress: any = {};
  err: any = {};
  currentTime: any;
  isfood = false;
  sellProduct = 2;

  public slideOpts: any = {
    slidesPerView: "auto",
    centeredSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 20,
    initialSlide: 1,
    autoplay: {
      delay: 3000,
    },
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-next",
    slideActiveClass: "swiper-slide-active",
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };
  grocery: any = {};
  btnType = "Exclusive";
  currency: any;
  Address: any;

  public innerWidth: any = window.innerWidth;
  public banners: any = Array();
  constructor(
    private menu: MenuController,
    private modalController: ModalController,
    private navCtrl: NavController,
    private nativeGeocoder: NativeGeocoder,
    private api: ApiService,
    private util: UtilService,
    private gpi: GroceryService,
    private geolocation: Geolocation
  ) {
    this.menu.enable(true);
    this.initData();
    this.dataa = JSON.parse(localStorage.getItem("store-detail"));

  }

  private initData() {
    this.getAdvertisingBanner();
    this.util.startLoad();
    this.api.getDataWithToken("groceryShop").subscribe(
      (res: any) => {
        if (res.success) {
          this.gpi.storeID = res.data.shop[0].id;
          this.api
            .getDataWithToken("groceryShopDetail/" + this.gpi.storeID)
            .subscribe(
              (res: any) => {
                if (res.success) {
                  this.data = res.data;

                  this.currency = this.api.currency;
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
        },
        (err) => {
          this.util.dismissLoader();
          this.err = err;
        }
      );
  }

  getAdvertisingBanner(): void {
    this.api.getData("banner").subscribe((res: any) => {
      if (res.success) {
        this.banners = res.data;
      }
    });
  }

  ionViewWillEnter() {
    this.cartData = JSON.parse(localStorage.getItem("store-detail")) || [];

    if (this.cartData.length > 0) {
      if (this.data.product && this.data.product.length > 0) {
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

    if (localStorage.getItem("isaddress") != "false") {
      this.util.startLoad();
      this.api
        .getDataWithToken("getAddress/" + localStorage.getItem("isaddress"))
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.userAddress = res.data;
              this.util.dismissLoader();
            }
          },
          (err) => {
            this.err = err;
            this.util.dismissLoader();
          }
        );
    } else {
      this.util.startLoad();
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          resp.coords.latitude;
          resp.coords.longitude;
          this.userAddress.lat = resp.coords.latitude;
          this.userAddress.lang = resp.coords.longitude;

          const options: NativeGeocoderOptions = {
            useLocale: true,
            maxResults: 5,
          };
          this.nativeGeocoder
            .reverseGeocode(
              resp.coords.latitude,
              resp.coords.longitude,
              options
            )
            .then((result: NativeGeocoderResult[]) => {
              this.util.dismissLoader();
              this.userAddress.address_type = "Current Location";
              this.userAddress.soc_name = result[0].subLocality;
              this.userAddress.street = result[0].thoroughfare;
              this.userAddress.city = result[0].locality;
              this.userAddress.zipcode = result[0].postalCode;
            })
            .catch((error: any) => console.log(error));
        })
        .catch((error) => {
          this.util.dismissLoader();
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

  ngOnInit() {}
  viewMore() {
    this.navCtrl.navigateForward("product");
  }
  viewMoreCategory() {
    this.navCtrl.navigateForward("/grocery-category");
  }
  subcategory(id) {
    this.gpi.catId = id;
    this.navCtrl.navigateForward("/category-detail");
  }

  cart() {
    if (this.cartData.length == 0) {
      this.util.presentToast("cart is empty");
    } else {
      this.gpi.cartData = this.cartData;
      this.navCtrl.navigateForward("/grocery-cart");
    }
  }
  ionViewWillLeave() {
    this.gpi.cartData = this.cartData;
  }
  storeDetail(id) {
    this.gpi.itemId = id;
    this.navCtrl.navigateForward("/product-detail");
  }
}
