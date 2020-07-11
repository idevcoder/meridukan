import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OtpmodalpagePage } from './otpmodalpage.page';

const routes: Routes = [
  {
    path: '',
    component: OtpmodalpagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OtpmodalpagePage],
  entryComponents: [OtpmodalpagePage]
})
export class OtpmodalpagePageModule {}
