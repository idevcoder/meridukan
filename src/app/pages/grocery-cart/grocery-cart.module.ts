import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { AgmCoreModule } from "@agm/core";
import { IonicModule } from "@ionic/angular";
import { AgmDirectionModule } from "agm-direction";
import { GroceryCartPage } from "./grocery-cart.page";
import { TranslateModule } from "@ngx-translate/core";

const routes: Routes = [
  {
    path: "",
    component: GroceryCartPage,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgmCoreModule.forRoot({
      apiKey: "",
    }),
    AgmDirectionModule,
    TranslateModule,
    RouterModule.forChild(routes),
  ],
  declarations: [GroceryCartPage],
})
export class GroceryCartPageModule {}
