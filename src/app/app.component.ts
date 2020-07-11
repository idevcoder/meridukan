import { OneSignal } from "@ionic-native/onesignal/ngx";
import { UtilService } from "./service/util.service";
import { ApiService } from "./service/api.service";
import { Component } from "@angular/core";

import { Platform, NavController, ToastController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { menuController } from "@ionic/core";
import { Router } from "@angular/router";
import { IonRouterOutlet } from "@ionic/angular";
import { QueryList, ViewChildren } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "assets/icon-image/Icon-home.svg",
    },
    {
      title: "Notification",
      url: "/notification",
      icon: "assets/icon-image/bell.svg",
    },
    {
      title: "Promo Code",
      url: "/promocode/menu",
      icon: "assets/icon-image/coupon.svg",
    },
    // {
    //   title: "Invite Friends",
    //   url: "/invite-friends",
    //   icon: "assets/icon-image/invite-user.svg",
    // },
    {
      title: "Grocery Order",
      url: "/grocery-history",
      icon: "assets/icon-image/grocery-icon.svg",
    },
  ];
  userData: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService,
    private oneSignal: OneSignal,
    private toastController: ToastController,
    private router: Router,
    private translate: TranslateService
  ) {
    console.log = function () {};

    document.documentElement.dir =
      localStorage.getItem("app_language") == "ar" ? "rtl" : "ltr";
    this.translate.setDefaultLang(
      localStorage.getItem("app_language")
        ? localStorage.getItem("app_language")
        : "en"
    );

    this.api.getData("keySetting").subscribe((res: any) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" + res.data.map_key;
      document.head.appendChild(script);
    });

    this.initializeApp();
    this.backButtonEvent();

    this.util.isUpdateProfile.subscribe((isLogin) => {
      if (localStorage.getItem("token")) {
        this.api.getDataWithToken("userDetail").subscribe((res: any) => {
          if (res.success) {
            this.userData = res.data;
          }
        });
      }
    });
    if (localStorage.getItem("token")) {
      this.ntrl.navigateRoot("/home");
    } else {
      this.ntrl.navigateRoot("login");
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        this.splashScreen.hide();
        this.api.getData("keySetting").subscribe(
          (res: any) => {
            if (res.success) {
              this.api.currency = res.data.currency_symbol;
              this.api.currencyType = res.data.currency;
              this.api.request_duration = res.data.request_duration;
              if (this.platform.is("cordova")) {
                this.oneSignal.startInit(
                  res.data.onesignal_app_id,
                  res.data.onesignal_project_number
                );
                this.oneSignal
                  .getIds()
                  .then((ids) => (this.api.deviceToken = ids.userId));
                this.oneSignal.endInit();
              } else {
                this.api.deviceToken = null;
              }
            }
          },
          (err) => {}
        );
      }, 2000);
    });
  }

  logout() {
    menuController.close();
    localStorage.removeItem("token");
    localStorage.removeItem("isaddress");
    this.ntrl.navigateRoot(["login"]);
  }

  close() {
    menuController.close();
  }

  profile() {
    menuController.close();
    this.ntrl.navigateForward(["profile"]);
  }

  Setting() {
    menuController.close();
    this.ntrl.navigateForward("/profile/setting");
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/home" ||
          this.router.url === "/login" ||
          this.router.url === "/notification" ||
          this.router.url === "/promocode/menu" ||
          this.router.url === "/invite-friends" ||
          this.router.url === "/order-history" ||
          this.router.url === "/profile" ||
          this.router.url === "/login"
        ) {
          if (
            new Date().getTime() - this.lastTimeBackPress <
            this.timePeriodToExit
          ) {
            navigator["app"].exitApp();
          } else {
            this.showToast();
            this.lastTimeBackPress = new Date().getTime();
          }
        }
      });
    });
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: "press back again to exit App.",
      duration: 2000,
    });
    toast.present();
  }
}
