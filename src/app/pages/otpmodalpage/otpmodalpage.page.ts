import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { UtilService } from 'src/app/service/util.service';
import { ModalController } from '@ionic/angular';
import { GroceryService } from 'src/app/service/grocery.service';

@Component({
  selector: 'app-otpmodalpage',
  templateUrl: './otpmodalpage.page.html',
  styleUrls: ['./otpmodalpage.page.scss'],
})
export class OtpmodalpagePage implements OnInit {
  order_id:any;
  constructor(
    private api:ApiService,
    private util:UtilService,
    private modalController: ModalController,
    private gpi:GroceryService
  ) {
    this.util.startLoad();
    this.api
      .getDataWithToken("singleGroceryOrder/" + this.gpi.orderId)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.order_id = res.data.id;  
          }
        },
        (err) => {
          this.util.dismissLoader();
        }
      );
  }
  data: any = {};
  err: any = {};
  ngOnInit() {
  }

  checkOtp() {
    this.data.order_id = this.order_id;
    this.util.startLoad();
    this.api.postDataWithToken("deliveredProduct", this.data).subscribe(
      (res: any) => {
        if (res.success) {
          this.modalController.dismiss("true");
          this.util.dismissLoader();
          this.err = {};
          this.order_id = res.data.id;
        } else {
          this.util.dismissLoader();
          this.err = {};
          this.util.presentToast(res.msg);
        }
      },
      err => {
        this.util.dismissLoader();
        this.err = err.error.errors;
      }
    );
  }

}
