import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class GroceryService {
  storeID: any;
  catId: any;
  itemId: any;
  orderId: any;
  cartData: any = [];
  promocode: any;
  info: any;
  constructor() {}
}
