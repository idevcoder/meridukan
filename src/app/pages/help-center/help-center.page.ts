import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-help-center',
  templateUrl: './help-center.page.html',
  styleUrls: ['./help-center.page.scss'],
})
export class HelpCenterPage implements OnInit {

  constructor(private ntrl:NavController) { }

  ngOnInit() {
  }
  back(){
    this.ntrl.back();
  }
  profile(){
    this.ntrl.navigateForward(['profile']);
  }
}
