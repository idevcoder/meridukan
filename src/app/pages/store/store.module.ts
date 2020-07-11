import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { StorePage } from "./store.page";
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: "",
    component: StorePage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2SearchPipeModule,
    TranslateModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  declarations: [StorePage],
})
export class StorePageModule { }
