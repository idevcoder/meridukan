import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { MenuController, NavController } from "@ionic/angular";

@Component({
  selector: "app-get-otp",
  templateUrl: "./get-otp.page.html",
  styleUrls: ["./get-otp.page.scss"]
})
export class GetOtpPage implements OnInit {
  opt: any = {};
  err: any = {};
  data: any = {
    phone: this.api.verifynumber,
    id: this.api.verifyId
  };

  constructor(
    private menu: MenuController,
    private nav: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.menu.enable(false);
  }

  ngOnInit() {}
  clearData = clear => {
    if (clear == "1") this.opt.a = "";
    else if (clear == "2") this.opt.b = "";
    else if (clear == "3") this.opt.c = "";
    else if (clear == "4") this.opt.d = "";
    else if (clear == "5") this.opt.e = "";
    else this.opt.f = "";
  };

  moveFocus(event, nextElement, previousElement, clear) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
      this.clearData(clear - 1);
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = "";
    }
  }
  back() {
    this.nav.navigateBack("verify");
  }

  goHome() {
    this.data.otp =
      this.opt.a +
      this.opt.b +
      this.opt.c +
      this.opt.d +
      this.opt.e +
      this.opt.f;
    this.util.startLoad();
    this.api.postData("checkOtp", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          localStorage.setItem("token", res.data.token);
          this.api.userToken = res.data.token;
          if (res.data.address_id) {
            localStorage.setItem("isaddress", res.data.address_id);
          } else {
            localStorage.setItem("isaddress", "false");
          } 
          this.util.isUpdateProfile.next(true);
          this.nav.navigateRoot("slide");
        }
      },
      err => {
        if (err.error.msg) {
          this.util.presentToast(err.error.msg);
        }
        this.err = err.error.errors;
        this.util.dismissLoader();
      }
    );
  }
  resendOtp() {
    this.data.code = this.api.verifynuberCode;
    this.util.startLoad();
    this.api.postData("resendOTP", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.util.presentToast(res.data);
        }
      },
      err => {
        this.err = err.error.errors;
        this.util.dismissLoader();
      }
    );
  }
}
