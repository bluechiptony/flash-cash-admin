import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TicketTableSets } from "../application/modules/usergopos/usergopos.module";

@Component({
  selector: "app-tickets",
  templateUrl: "./tickets.component.html",
  styleUrls: ["./tickets.component.scss"]
})
export class TicketsComponent implements OnInit {
  tableSet: any;
  tableSetInterpretation: any;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.getRoute();
  }

  getRoute() {
    let path = this.activeRoute.snapshot.url[0].path;
    console.log(path);
    if (path === "open-tickets") {
      this.tableSet = TicketTableSets.OPEN;
      this.tableSetInterpretation = "Open";
    } else if (path === "my-ticket-assignments") {
      this.tableSet = TicketTableSets.USER;
      this.tableSetInterpretation = "My Assigned";
    } else if (path === "tickets") {
      this.tableSet = TicketTableSets.ALL;
      this.tableSetInterpretation = "All";
    } else {
      this.tableSet = TicketTableSets.ALL;
      this.tableSetInterpretation = "All";
    }
  }
}
