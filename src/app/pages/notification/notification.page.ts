import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.page.html",
  styleUrls: ["./notification.page.scss"]
})
export class NotificationPage implements OnInit {
  public data: any = [];
  constructor(
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {
    this.util.startLoad();
    this.api.getDataWithToken("viewNotification").subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
      }
      this.util.dismissLoader();
    }, () => {
      this.util.dismissLoader();
    });
  }

  ngOnInit() {}
  back() {
    this.ntrl.back();
  }
}
