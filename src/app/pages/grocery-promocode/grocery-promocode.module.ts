import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroceryPromocodePage } from './grocery-promocode.page';

const routes: Routes = [
  {
    path: '',
    component: GroceryPromocodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroceryPromocodePage]
})
export class GroceryPromocodePageModule {}
