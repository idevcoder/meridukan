import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { HomePage } from "./home.page";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2SearchPipeModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
