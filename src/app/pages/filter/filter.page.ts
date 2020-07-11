import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { modalController } from "@ionic/core";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.page.html",
  styleUrls: ["./filter.page.scss"]
})
export class FilterPage implements OnInit {
  filter: any = [
    { name: "Top Rated", checked: true },
    { name: "Open Now", checked: false },
    { name: "Nearest Me", checked: false },
    { name: "Most Popular", checked: false },
    { name: "Cost High to Low", checked: false },
    { name: "Cost Low to High", checked: false }
  ];
  constructor(private ntrl: NavController) {}

  ngOnInit() {}
  goHome() {
    modalController.dismiss(this.filter);
    this.ntrl.navigateForward(["home"]);
  }

  setAddressType(type) {
    this.filter.forEach(element => {
      element.checked = false;
    });
    type.checked = true;
  }
}
