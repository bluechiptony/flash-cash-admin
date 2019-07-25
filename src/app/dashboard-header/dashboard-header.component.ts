import { Component, OnInit } from "@angular/core";
import { AppService } from "../application/services/app.service";

@Component({
  selector: "app-dashboard-header",
  templateUrl: "./dashboard-header.component.html",
  styleUrls: ["./dashboard-header.component.scss"]
})
export class DashboardHeaderComponent implements OnInit {
  loggedInUser: any = this.app.getLoggedInUser();
  constructor(private app: AppService) {}

  ngOnInit() {}

  logOut = (): void => {
    this.app.logout();
  };
}
