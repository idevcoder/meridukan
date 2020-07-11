import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.page.html",
  styleUrls: ["./forgot.page.scss"]
})
export class ForgotPage implements OnInit {
  data: any = {};
  err: any = {};
  constructor(
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService
  ) {}

  ngOnInit() {}
  Sendpassword() {
    this.util.startLoad();
    this.api.postData("forgetPassword", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.util.dismissLoader();
          this.util.presentToast(res.msg);
          this.ntrl.navigateForward(["login"]);
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
  backPage() {
    this.ntrl.back();
  }
}
