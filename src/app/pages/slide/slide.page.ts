import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.page.html',
  styleUrls: ['./slide.page.scss'],
})
export class SlidePage implements OnInit {

  constructor(private ntrl:NavController,private menu:MenuController) { 
    this.menu.enable(false);
  }

  ngOnInit() {
  }
  home(){
    this.ntrl.navigateRoot('home');
  }
}
