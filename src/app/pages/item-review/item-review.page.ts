import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import * as moment from "moment";
@Component({
  selector: "app-item-review",
  templateUrl: "./item-review.page.html",
  styleUrls: ["./item-review.page.scss"]
})
export class ItemReviewPage implements OnInit {
  data: any = [];
  constructor(private api: ApiService, private util: UtilService) {
    this.util.startLoad();
    this.api
      .getDataWithToken("itemReview/" + this.api.reviewId)
      .subscribe((res: any) => {
        if (res.success) {
          this.data = res.data;
          this.util.dismissLoader();
        }
      });
  }

  ngOnInit() {}
}
