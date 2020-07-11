import { Injectable } from "@angular/core";
import { ToastController, LoadingController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UtilService {
  public isUpdateProfile = new BehaviorSubject(true);
  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}
  isLoading = false;
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  async startLoad() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 9000,
        cssClass: "custom-loader",
        message: `<div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>`,
        spinner: null
      })
      .then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }
}
