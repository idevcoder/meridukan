import { UtilService } from "./../../service/util.service";
import { ApiService } from "./../../service/api.service";
import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  ModalController,
  NavController,
  AlertController,
} from "@ionic/angular";
import { CancleOrderPage } from "../cancle-order/cancle-order.page";
import { TranslateService } from "@ngx-translate/core";
declare var google;

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.page.html",
  styleUrls: ["./timeline.page.scss"],
})
export class TimelinePage {
  @ViewChild("slides", { static: true }) slides;
  @ViewChild("map", { static: true }) mapElement: ElementRef;
  dirService = new google.maps.DirectionsService();
  dirRenderer = new google.maps.DirectionsRenderer({ suppressMarkers: false });
  map: any;
  status: any = "";
  data: any = {};
  driver: any = {
    lat: "",
    lng: "",
    imagePath: "",
    image: "",
    name: "",
    phone: "",
  };
  public origin: any;
  public destination: any = {};
  public Centerlat: any;
  public Centerlng: any;
  get_duration_interval: any;
  public renderOptions = {
    suppressMarkers: true,
    draggable: false,
  };
  err: any = {};
  count = 1;
  geocoder = new google.maps.Geocoder();
  currency: any;
  public styles = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#f5f5f5",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#bdbdbd",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#ffffff",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#757575",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#dadada",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#616161",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
    {
      featureType: "transit.line",
      elementType: "geometry",
      stylers: [
        {
          color: "#e5e5e5",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "geometry",
      stylers: [
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#c9c9c9",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9e9e9e",
        },
      ],
    },
  ];
  public markerOptions = {
    origin: {
      icon: "../../../assets/image/red_marker.png",
    },
    destination: {
      icon: "../../../assets/image/green_marker.png",
    },
    draggable: true,
  };
  isvisible = false;
  userAddress: any;
  iconUrl = "../../../assets/image/bike.png";
  constructor(
    private translate: TranslateService,
    private ntrl: NavController,
    private api: ApiService,
    private util: UtilService,
    private alertController: AlertController
  ) {
    this.currency = this.api.currency;
    this.data.driver = {};
    this.util.startLoad();
    this.api
      .getDataWithToken("trackOrder/" + this.api.checkOrderStatus)
      .subscribe((res: any) => {
        if (res.success) {
          this.data = res.data;

          this.getUserAddress();
          this.getShopAddress();

          this.util.dismissLoader();

          if (this.data.deliveryBoy_id != null) {
            this.isvisible = true;
            this.driver = {
              lat: parseFloat(res.data.driver.lat),
              lng: parseFloat(res.data.driver.lang),
            };

            this.driver.name = res.data.driver.name;
            this.driver.imagePath = res.data.driver.imagePath;
            this.driver.image = res.data.driver.image;
            this.driver.phone = res.data.driver.phone;
            this.isvisible = true;
            this.Centerlat = parseFloat(this.driver.lat);
            this.Centerlng = parseFloat(this.driver.lang);

            if (
              this.data.order_status == "PickUpFood" ||
              this.data.order_status == "OnTheWay" ||
              this.data.order_status == "DriverReach" ||
              this.data.order_status == "Delivered"
            ) {
              this.markerOptions.origin.icon = "../../../assets/image/bike.png";
              this.isvisible = false;
            }
          } else {
            this.Centerlat = parseFloat(this.origin.lat);
            this.Centerlng = parseFloat(this.origin.lng);
          }

          if (
            this.data.order_status == "Pending" ||
            this.data.order_status == "Approved" ||
            this.data.order_status == "DriverApproved"
          ) {
            this.status = "1";
          } else if (this.data.order_status == "Prepare") {
            this.status = "2";
          } else if (
            this.data.order_status == "PickUpFood" ||
            this.data.order_status == "DriverAtShop"
          ) {
            this.status = "3";
          } else if (this.data.order_status == "OnTheWay") {
            this.isvisible = false;
            this.markerOptions.origin.icon = "../../../assets/image/bike.png";
            this.status = "4";
          } else if (this.data.order_status == "DriverReach") {
            this.status = "5";
            this.markerOptions.origin.icon = "../../../assets/image/bike.png";
            this.isvisible = false;
          } else {
            this.status = "6";
          }
        }
      });
    this.get_duration_interval = setInterval((interval) => {
      if (this.data.order_status == "Delivered") {
        clearInterval(this.get_duration_interval);
      } else {
        this.DriverLocation();
      }
    }, this.api.request_duration);
  }

  async cancleOrder() {
    this.translate.get("cancel_order_alert").subscribe(async (val) => {
      console.log("val: ", val);
      const alert = await this.alertController.create({
        header: val.title,
        message: val.text,
        buttons: [
          {
            text: val.yes,
            role: "yes",
            cssClass: "secondary",
            handler: () => {
              this.util.startLoad();
              this.api
                .getDataWithToken("cancelOrder/" + this.data.id)
                .subscribe(
                  (res: any) => {
                    if (res.success) {
                      this.util.dismissLoader();
                      this.util.presentToast(res.msg);
                      this.ntrl.navigateRoot("/order-history");
                    } else {
                      this.util.dismissLoader();
                      this.util.presentToast(res.msg);
                    }
                  },
                  (err) => {
                    this.util.dismissLoader();
                  }
                );
            },
          },
          {
            text: val.no,
            role: "no",
            cssClass: "secondary",
            handler: () => {},
          },
        ],
      });

      await alert.present();
    });
  }

  orderHistory() {
    this.ntrl.navigateForward(["order-history"]);
  }
  DriverLocation() {
    this.api.getDataWithToken("driverLocation/" + this.data.id).subscribe(
      (res: any) => {
        if (res.success) {
          this.driver = {
            lat: parseFloat(res.data.lat),
            lng: parseFloat(res.data.lang),
            name: res.data.name,
            imagePath: res.data.imagePath,
            image: res.data.image,
            phone: res.data.phone,
          };

          if (
            res.data.order_status == "PickUpFood" ||
            res.data.order_status == "OnTheWay" ||
            res.data.order_status == "DriverReach"
          ) {
            this.isvisible = false;
            this.origin = {
              lat: parseFloat(res.data.lat),
              lng: parseFloat(res.data.lang),
            };
          }

          this.Centerlat = parseFloat(res.data.lat);
          this.Centerlng = parseFloat(res.data.lang);
          if (this.data.deliveryBoy_id == null) {
            this.isvisible = false;
          }

          if (res.data.order_status == "DriverApproved") {
            this.status = "1";
            this.data.order_status = res.data.order_status;
            this.isvisible = true;
          } else if (res.data.order_status == "Prepare") {
            this.status = "2";
          } else if (
            res.data.order_status == "PickUpFood" ||
            res.data.order_status == "DriverAtShop"
          ) {
            this.status = "3";
            this.markerOptions.origin.icon = "../../../assets/image/bike.png";
          } else if (res.data.order_status == "OnTheWay") {
            this.markerOptions.origin.icon = "../../../assets/image/bike.png";
            this.status = "4";
          } else if (res.data.order_status == "DriverReach") {
            this.status = "5";
          } else {
            this.status = "6";
          }
        } else {
          if (res.data == "Delivered") {
            this.status = "6";
          }
        }
      },
      (err) => {
        this.err = err.error;
      }
    );
  }

  getUserAddress() {
    if (localStorage.getItem("isaddress") != "false") {
      this.util.startLoad();
      this.api
        .getDataWithToken("getAddress/" + localStorage.getItem("isaddress"))
        .subscribe(
          (res: any) => {
            if (res.success) {
              this.userAddress =
                res.data.soc_name +
                " " +
                res.data.street +
                " " +
                res.data.city +
                " " +
                res.data.zipcode;
              this.geocoder.geocode(
                { address: this.userAddress },
                (results, status) => {
                  if (status == google.maps.GeocoderStatus.OK) {
                    this.destination = {
                      lat: results[0].geometry.location.lat(),
                      lng: results[0].geometry.location.lng(),
                    };
                  }
                }
              );
              this.util.dismissLoader();
            }
          },
          (err) => {
            this.err = err;
            this.util.dismissLoader();
          }
        );
    }
  }

  getShopAddress() {
    this.origin = {
      lat: parseFloat(this.data.shop.latitude),
      lng: parseFloat(this.data.shop.longitude),
    };
  }

  ionViewWillLeave() {
    clearInterval(this.get_duration_interval);
  }
}
