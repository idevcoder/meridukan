import { NavController } from "@ionic/angular";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-grocery-home",
  templateUrl: "./grocery-home.page.html",
  styleUrls: ["./grocery-home.page.scss"],
})
export class GroceryHomePage implements OnInit {
  trending = [
    {
      name: "Real Fruit Juice ,Litchi, (Pack of 2)",
      img: "../../../assets/image/real_juice.png",
      qty: "1Ltr",
      price: "$15.50",
    },
    {
      name: "Real Fruit Juice ,Litchi, (Pack of 2)",
      img: "../../../assets/image/real_juice.png",
      qty: "1Ltr",
      price: "$15.50",
    },
    {
      name: "Real Fruit Juice ,Litchi, (Pack of 2)",
      img: "../../../assets/image/real_juice.png",
      qty: "1Ltr",
      price: "$15.50",
    },
  ];
  Store = [
    {
      img: "../../../assets/image/maket_logo.png",
      name: "New Seasons Market",
      away: "2km Away",
    },
    {
      img: "../../../assets/image/maket_logo.png",
      name: "New Seasons Market",
      away: "2km Away",
    },
    {
      img: "../../../assets/image/maket_logo.png",
      name: "New Seasons Market",
      away: "2km Away",
    },
  ];
  category = [
    {
      img: "../../../assets/image/alcohol.png",
      name: "Alcohol",
    },
    {
      img: "../../../assets/image/alcohol.png",
      name: "Alcohol",
    },
    {
      img: "../../../assets/image/alcohol.png",
      name: "Alcohol",
    },
  ];
  term = ""
  constructor(private nav: NavController) { }

  ngOnInit() { }
  viewMore() {
    this.nav.navigateForward("/store");
  }
}
