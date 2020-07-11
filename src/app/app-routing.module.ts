import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () =>
      import("./pages/home/home.module").then((m) => m.HomePageModule),
  },
  { path: "login", loadChildren: "./pages/login/login.module#LoginPageModule" },
  {
    path: "signup",
    loadChildren: "./pages/signup/signup.module#SignupPageModule",
  },
  {
    path: "verify",
    loadChildren: "./pages/verify/verify.module#VerifyPageModule",
  },
  {
    path: "get-otp",
    loadChildren: "./pages/get-otp/get-otp.module#GetOtpPageModule",
  },
  { path: "slide", loadChildren: "./pages/slide/slide.module#SlidePageModule" },
  { path: "cart", loadChildren: "./pages/cart/cart.module#CartPageModule" },
  {
    path: "payment-method",
    loadChildren:
      "./pages/payment-method/payment-method.module#PaymentMethodPageModule",
  },
  {
    path: "add-card",
    loadChildren: "./pages/add-card/add-card.module#AddCardPageModule",
  },
  {
    path: "success-modal",
    loadChildren:
      "./pages/success-modal/success-modal.module#SuccessModalPageModule",
  },
  {
    path: "payment",
    loadChildren: "./pages/payment/payment.module#PaymentPageModule",
  },
  {
    path: "order-history",
    loadChildren:
      "./pages/order-history/order-history.module#OrderHistoryPageModule",
  },
  {
    path: "order-detail",
    loadChildren:
      "./pages/order-detail/order-detail.module#OrderDetailPageModule",
  },
  {
    path: "restaurant-detail",
    loadChildren:
      "./pages/restaurant-detail/restaurant-detail.module#RestaurantDetailPageModule",
  },
  {
    path: "promocode/:id",
    loadChildren: "./pages/promocode/promocode.module#PromocodePageModule",
  },
  {
    path: "notification",
    loadChildren:
      "./pages/notification/notification.module#NotificationPageModule",
  },
  {
    path: "invite-friends",
    loadChildren:
      "./pages/invite-friends/invite-friends.module#InviteFriendsPageModule",
  },
  {
    path: "help-center",
    loadChildren: "./pages/help-center/help-center.module#HelpCenterPageModule",
  },
  {
    path: "filter",
    loadChildren: "./pages/filter/filter.module#FilterPageModule",
  },
  {
    path: "profile",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
  },
  {
    path: "profile/:id",
    loadChildren: "./pages/profile/profile.module#ProfilePageModule",
  },
  {
    path: "timeline",
    loadChildren: "./pages/timeline/timeline.module#TimelinePageModule",
  },

  {
    path: "popover",
    loadChildren: "./pages/popover/popover.module#PopoverPageModule",
  },
  {
    path: "review",
    loadChildren: "./pages/review/review.module#ReviewPageModule",
  },
  {
    path: "forgot",
    loadChildren: "./pages/forgot/forgot.module#ForgotPageModule",
  },
  {
    path: "item-review",
    loadChildren: "./pages/item-review/item-review.module#ItemReviewPageModule",
  },
  {
    path: "add-address",
    loadChildren: "./pages/add-address/add-address.module#AddAddressPageModule",
  },
  {
    path: "select-address",
    loadChildren:
      "./pages/select-address/select-address.module#SelectAddressPageModule",
  },
  {
    path: "category/:id",
    loadChildren: "./pages/category/category.module#CategoryPageModule",
  },
  {
    path: "category",
    loadChildren: "./pages/category/category.module#CategoryPageModule",
  },
  {
    path: "grocery-home",
    loadChildren:
      "./pages/grocery-home/grocery-home.module#GroceryHomePageModule",
  },
  { path: "store", loadChildren: "./pages/store/store.module#StorePageModule" },
  {
    path: "store-detail",
    loadChildren:
      "./pages/store-detail/store-detail.module#StoreDetailPageModule",
  },
  {
    path: "product",
    loadChildren: "./pages/product/product.module#ProductPageModule",
  },
  {
    path: "grocery-category",
    loadChildren:
      "./pages/grocery-category/grocery-category.module#GroceryCategoryPageModule",
  },
  {
    path: "category-detail",
    loadChildren:
      "./pages/category-detail/category-detail.module#CategoryDetailPageModule",
  },
  {
    path: "product-detail",
    loadChildren:
      "./pages/product-detail/product-detail.module#ProductDetailPageModule",
  },
  { path: 'product-filter', loadChildren: './pages/product-filter/product-filter.module#ProductFilterPageModule' },
  { path: 'grocery-cart', loadChildren: './pages/grocery-cart/grocery-cart.module#GroceryCartPageModule' },
  { path: 'pay-method', loadChildren: './pages/pay-method/pay-method.module#PayMethodPageModule' },
  { path: 'grocery-status', loadChildren: './pages/grocery-status/grocery-status.module#GroceryStatusPageModule' },
  { path: 'grocery-history', loadChildren: './pages/grocery-history/grocery-history.module#GroceryHistoryPageModule' },
  { path: 'grocery-order-detail', loadChildren: './pages/grocery-order-detail/grocery-order-detail.module#GroceryOrderDetailPageModule' },
  { path: 'grocery-success', loadChildren: './pages/grocery-success/grocery-success.module#GrocerySuccessPageModule' },
  { path: 'grocery-promocode', loadChildren: './pages/grocery-promocode/grocery-promocode.module#GroceryPromocodePageModule' },
/*   { path: 'otpmodalpage', loadChildren: './pages/otpmodalpage/otpmodalpage.module#OtpmodalpagePageModule' }, */
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
