import { UtilService } from "./../../service/util.service";
import { AddAddressPage } from "./../add-address/add-address.page";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavController } from "@ionic/angular";
import { ApiService } from "./../../service/api.service";
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: "app-select-address",
  templateUrl: "./select-address.page.html",
  styleUrls: ["./select-address.page.scss"]
})
export class SelectAddressPage implements OnInit {
  addressList: any;
  isAddadress = false;
  constructor(
    private modalController: ModalController,
    private api: ApiService,
    private util: UtilService,
    private ntrl: NavController,
    private translate: TranslateService
  ) {
    this.util.startLoad();
    this.api.getDataWithToken("userAddress").subscribe((res: any) => {
      if (res.success) {
        this.addressList = res.data;
        this.util.dismissLoader();
        if (localStorage.getItem("isaddress")) {
          this.addressList.forEach(element => {
            if (element.id == localStorage.getItem("isaddress")) {
              element.checked = true;
            }
          });
        }
      }
    });
  }

  ngOnInit() {}
  async addAddress() {
    this.isAddadress = true;
    const modal = await this.modalController.create({
      component: AddAddressPage
    });
    modal.onDidDismiss().then((data: any) => {
      if (data["data"] != undefined) {
        if (data) {
          this.util.startLoad();
          this.api.getDataWithToken("userAddress").subscribe((res: any) => {
            if (res.success) {
              this.addressList = res.data;
              this.util.dismissLoader();
              if (localStorage.getItem("isaddress")) {
                this.addressList.forEach(element => {
                  if (element.id == localStorage.getItem("isaddress")) {
                    element.checked = true;
                  }
                });
              }
            }
          });
        }
      }
    });
    return await modal.present();
  }
  setAddress(name) {
    this.addressList.forEach(element => {
      element.checked = false;
    });
    name.checked = true;
  }
  async editAddress(address) {
    address.action = "edit";
    this.api.parseData = address;

    const modal = await this.modalController.create({
      component: AddAddressPage
    });
    return await modal.present();
  }
  deleteAddress(address) {
    this.util.startLoad();
    this.api
      .getDataWithToken("deleteAddress/" + address.id)
      .subscribe((res: any) => {
        if (res.success) {
          this.api.getDataWithToken("userAddress").subscribe((res: any) => {
            if (res.success) {
              this.addressList = res.data;
              this.util.dismissLoader();
              if (localStorage.getItem("isaddress")) {
                this.addressList.forEach(element => {
                  if (element.id == localStorage.getItem("isaddress")) {
                    element.checked = true;
                  }
                });
              }
            }
          });
        }
      });
  }
  setDefaultAddress() {
    let selectedAddress: any;
    this.addressList.forEach(element => {
      if (element.checked) {
        selectedAddress = element.id;
      }
    });

    if (selectedAddress) {
      localStorage.setItem("isaddress", selectedAddress);
      this.ntrl.back();
    } else {
      this.translate.get('toasts').subscribe(async val => {  
        this.util.presentToast(val.select_default_address);
      })
    }
  }
}
