import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {

  constructor(private ntrl:NavController) { }

  ngOnInit() {
  }
  paymentCard(){
    this.ntrl.navigateForward(['payment']);
  }
}
