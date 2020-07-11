import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";

@Component({
  selector: "app-invite-friends",
  templateUrl: "./invite-friends.page.html",
  styleUrls: ["./invite-friends.page.scss"],
})
export class InviteFriendsPage implements OnInit {
  data: any;
  constructor(
    private ntrl: NavController,
    private api: ApiService,
    private socialSharing: SocialSharing,
    private util: UtilService
  ) {
    this.util.startLoad();
    this.api.getDataWithToken("friendsCode").subscribe((res: any) => {
      if (res.success) {
        this.data = res.data;
        this.util.dismissLoader();
      }
    });
  }

  ngOnInit() {}
  back() {
    this.ntrl.back();
  }
  shareIt() {
    this.socialSharing
      .share(
        "please login my referral code " +
          this.data +
          " with irest app and get first order free"
      )
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }
}
