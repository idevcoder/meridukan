import { GrocerySuccessPageModule } from "./pages/grocery-success/grocery-success.module";
import { ProductFilterPageModule } from "./pages/product-filter/product-filter.module";
import { AddAddressPageModule } from "./pages/add-address/add-address.module";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SuccessModalPageModule } from "./pages/success-modal/success-modal.module";
import { FilterPageModule } from "./pages/filter/filter.module";
import { PopoverPageModule } from "./pages/popover/popover.module";
import { CancleOrderPageModule } from "./pages/cancle-order/cancle-order.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { Camera } from "@ionic-native/camera/ngx";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { NativeGeocoder } from "@ionic-native/native-geocoder/ngx";
import { PayPal } from "@ionic-native/paypal/ngx";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { OtpmodalpagePage } from './pages/otpmodalpage/otpmodalpage.page';
import { OtpmodalpagePageModule } from './pages/otpmodalpage/otpmodalpage.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SuccessModalPageModule,
    GrocerySuccessPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    FilterPageModule,
    PopoverPageModule,
    ProductFilterPageModule,
    CancleOrderPageModule,
    HttpClientModule,
    AddAddressPageModule,
    OtpmodalpagePageModule
  ],
  providers: [
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Geolocation,
    Camera,
    NativeGeocoder,
    SocialSharing,
    PayPal,
    OneSignal,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "../assets/json/", ".json");
}
