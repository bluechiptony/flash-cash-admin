import { Component, OnInit } from "@angular/core";
import { AppService } from "../application/services/app.service";
import { ActivatedRoute } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";
import { MatDialog } from "@angular/material/dialog";
import { TicketResponseModalComponent } from "../modals/ticket-response-modal/ticket-response-modal.component";
import { TicketCloseModalComponent } from "../modals/ticket-close-modal/ticket-close-modal.component";

@Component({
  selector: "app-ticket",
  templateUrl: "./ticket.component.html",
  styleUrls: ["./ticket.component.scss"]
})
export class TicketComponent implements OnInit {
  ticketNumber: string = "";
  loading: boolean;
  ticket: any = {};
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  constructor(
    private app: AppService,
    private activeRoute: ActivatedRoute,
    private dialogRef: MatDialog
  ) {}

  ngOnInit() {
    this.getTicketNumber();
  }

  getTicketNumber = (): void => {
    this.activeRoute.params.subscribe(params => {
      this.ticketNumber = params.ticketnumber;
      this.getTicketFromRemote(this.ticketNumber);
    });
  };

  getTicketFromRemote = (ticketNumber): void => {
    this.loading = true;
    let url = `${this.app.BASE_URL}/tickets/get/${ticketNumber}`;

    this.app.makeGetRequestWithParams(url, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.ticket = response.data;
        }
        console.log(data);
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  };

  closeTicket = (): void => {
    let dialog = this.dialogRef.open(TicketCloseModalComponent, {
      width: "700px;",
      data: {
        ticketNumber: this.ticketNumber
      }
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.ngOnInit();
      }
    });
  };
}
