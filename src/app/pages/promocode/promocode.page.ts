import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-promocode",
  templateUrl: "./promocode.page.html",
  styleUrls: ["./promocode.page.scss"]
})
export class PromocodePage implements OnInit {
  data: any;
  isfrom: any;
  promocode: any = {};
  constructor(
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.isfrom = params["id"];
      if (this.isfrom == "menu") {
        this.util.startLoad();
        this.api.getDataWithToken("viewCoupon").subscribe((res: any) => {
          if (res.success) {
            this.data = res.data;
            this.util.dismissLoader();
          }
        });
      } else {
        this.util.startLoad();
        this.api
          .getDataWithToken("viewShopCoupon/" + this.isfrom)
          .subscribe((res: any) => {
            if (res.success) {
              this.data = res.data;
              this.util.dismissLoader();
            }
          });
      }
    });
  }

  ngOnInit() {}

  back() {
    this.ntrl.back();
  }
  applyPromocode(item) {
    this.promocode.code = item.code;
    this.util.startLoad();
    this.api
      .postDataWithToken("chkCoupon", this.promocode)
      .subscribe((res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.api.promocode = item;
          this.ntrl.back();
        } else {
          this.util.dismissLoader();
          this.util.presentToast(res.msg);
        }
      });
  }
}
