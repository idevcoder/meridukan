import { environment } from "./../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  baseUrl: any = environment.baseUrl;
  verifyId: any;
  verifynuberCode: any;
  verifynumber: any;
  userToken: any;
  detailId: any;
  orderID: any;
  reviewId: any;
  cartData: any = {};
  promocode: any = {};
  parseData: any;
  checkOrderStatus: any;
  menu: any = [];
  deviceToken: any;
  order_id:any;
  currency: any;
  currencyType: any;
  filterType: any;
  request_duration: any;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("token")) {
      this.userToken = localStorage.getItem("token");
    }
  }

  getData(url) {
    return this.http.get(this.baseUrl + url);
  }

  postData(url, data) {
    return this.http.post(this.baseUrl + url, data);
  }

  getDataWithToken(url) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.get(this.baseUrl + url, { headers: header });
  }

  postDataWithToken(url, data) {
    let header = new HttpHeaders();
    header = header.set("Authorization", "Bearer " + this.userToken);
    header = header.set("Accept", "application/json");
    return this.http.post(this.baseUrl + url, data, { headers: header });
  }
}
