import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { SuccessModalPage } from '../success-modal/success-modal.page';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  constructor(private modalController:ModalController, private ntrl:NavController) { }

  ngOnInit() {
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SuccessModalPage,
      cssClass:'SuccessModal'
    });
    return await modal.present();
  }
  back(){
    this.ntrl.back();

  }
  addCard(){
    this.ntrl.navigateForward(['add-card']);
  }
}
