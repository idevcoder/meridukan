import { NavController } from "@ionic/angular";
import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute } from "@angular/router";
declare var google;

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"]
})
export class CategoryPage implements OnInit {
  data: any = [];
  err: any = {};
  currency: any;
  Address: any;
  btnType = "Exclusive";
  isfrom: any;
  geocoder = new google.maps.Geocoder();
  constructor(
    private api: ApiService,
    private util: UtilService,
    private geolocation: Geolocation,
    private ntrl: NavController,
    private route: ActivatedRoute
  ) {
    this.currency = this.api.currency;

    this.route.params.subscribe(params => {
      this.isfrom = params["id"];
      if (this.isfrom) {
        this.util.startLoad();
        this.api
          .getDataWithToken("categoryShop/" + this.isfrom)
          .subscribe((res: any) => {
            if (res.success) {
              this.util.dismissLoader();
              this.data = res.data;
            }
          });
      } else {

        this.util.startLoad();
        this.api.getDataWithToken("shops").subscribe(
          (res: any) => {
            if (res.success) {
              this.data = res.data;
              if (this.api.filterType == "popular") {
                this.util.dismissLoader();
                this.data.sort((a, b) => {
                  if (a.rate > b.rate) {
                    return -1;
                  }
                  if (a.rate < b.rate) {
                    return 1;
                  }
                  return 0;
                });
              } else if (this.api.filterType == "pureveg") {
                this.util.dismissLoader();
                this.data = this.data.filter(a => {
                  if (a.veg > 0) {
                    return a;
                  }
                });
              } else if (this.api.filterType == "lowcost") {
                this.util.dismissLoader();
                this.data.sort((a, b) => {
                  if (a.avarage_plate_price < b.avarage_plate_price) {
                    return -1;
                  }
                  if (a.avarage_plate_price > b.avarage_plate_price) {
                    return 1;
                  }
                  return 0;
                });
              } else {
                this.util.dismissLoader();
                if (localStorage.getItem("isaddress") != "false") {
                  this.api
                    .getDataWithToken(
                      "getAddress/" + localStorage.getItem("isaddress")
                    )
                    .subscribe((res: any) => {
                      if (res.success) {
                        this.data.forEach(element => {
                          element.distance = this.distance(
                            res.data.lat,
                            res.data.lang,
                            element.latitude,
                            element.longitude,
                            "K"
                          );
                        });
                        this.data.sort((a, b) => {
                          if (a.distance < b.distance) {
                            return -1;
                          }
                          if (a.distance > b.distance) {
                            return 1;
                          }
                        });
                      }
                    });
                } else {
                  this.geolocation
                    .getCurrentPosition()
                    .then(resp => {
                      resp.coords.latitude;
                      resp.coords.longitude;
                      this.data.forEach(element => {
                        element.distance = this.distance(
                          resp.coords.latitude,
                          resp.coords.longitude,
                          element.latitude,
                          element.longitude,
                          "K"
                        );
                      });
                      this.data.sort((a, b) => {
                        if (a.distance < b.distance) {
                          return -1;
                        }
                        if (a.distance > b.distance) {
                          return 1;
                        }
                      });
                    })
                    .catch(error => {

                    });
                }
              }
            }
          },
          err => {
            this.err = err.error;
          }
        );
      }
    });
  }

  ngOnInit() { }
  distance(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      let radlat1 = (Math.PI * lat1) / 180;
      let radlat2 = (Math.PI * lat2) / 180;
      let theta = lon1 - lon2;
      let radtheta = (Math.PI * theta) / 180;
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist;
    }
  }
  resturantDetail(id) {
    this.api.detailId = id;
    this.ntrl.navigateForward("/restaurant-detail");
  }
}
