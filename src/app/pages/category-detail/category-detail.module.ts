import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoryDetailPage } from './category-detail.page';
import { TranslateModule } from '@ngx-translate/core';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

const routes: Routes = [
  {
    path: '',
    component: CategoryDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    Ng2SearchPipeModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CategoryDetailPage]
})
export class CategoryDetailPageModule { }
