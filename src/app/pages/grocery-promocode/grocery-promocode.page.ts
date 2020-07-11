import { NavController } from "@ionic/angular";
import { GroceryService } from "./../../service/grocery.service";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grocery-promocode",
  templateUrl: "./grocery-promocode.page.html",
  styleUrls: ["./grocery-promocode.page.scss"],
})
export class GroceryPromocodePage implements OnInit {
  data: any = [];
  isfrom = "menu"
  constructor(
    private api: ApiService,
    private util: UtilService,
    private gpi: GroceryService,
    private ntrl: NavController
  ) {
    this.util.startLoad();
    this.api
      .getDataWithToken("viewGroceryShopCoupon/" + this.gpi.storeID)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.util.dismissLoader();
            this.data = res.data;
          }
        },
        (err) => {
          this.util.dismissLoader();
          this.util.presentToast("somethig went wrong");
        }
      );
  }

  ngOnInit() { }
  applyPromocode(item) {
    let promocode: any = {};
    promocode.code = item.code;
    this.util.startLoad();
    this.api.postDataWithToken("chkCoupon", promocode).subscribe((res: any) => {
      if (res.success) {
        this.util.dismissLoader();
        this.gpi.promocode = item;
        this.ntrl.back();
      } else {
        this.util.dismissLoader();
        this.util.presentToast(res.msg);
      }
    });
  }
}
