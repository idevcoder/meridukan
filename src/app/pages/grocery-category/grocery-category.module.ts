import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GroceryCategoryPage } from './grocery-category.page';

const routes: Routes = [
  {
    path: '',
    component: GroceryCategoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GroceryCategoryPage]
})
export class GroceryCategoryPageModule {}
