import { Component, OnInit } from "@angular/core";

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"]
})
export class TransactionsComponent implements OnInit {
  routePath: string;
  constructor(private activeRoute: ActivatedRoute) {}

  getRoute = (): void => {
    let route = this.activeRoute.snapshot.url;
    console.log(route[1]);
    if (route[1] !== undefined) {
      let routePath = route[1].path;
      if (routePath === "value-acquisition") {
        this.routePath = "Value Acquisition";
      } else if (routePath === "value-transfer") {
        this.routePath = "Transfers";
      } else if (routePath === "value-checkout") {
        this.routePath = "Checkout Transactions";
      } else {
        this.routePath = "Transactions";
      }
    }
  };

  ngOnInit() {
    this.getRoute();
  }
}
