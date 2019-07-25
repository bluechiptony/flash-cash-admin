import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../application/services/app.service";
import { MatDialog } from "@angular/material/dialog";
import { TicketResponseModalComponent } from "../modals/ticket-response-modal/ticket-response-modal.component";
import { ActivatedRoute } from "@angular/router";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-ticket-correspondence",
  templateUrl: "./ticket-correspondence.component.html",
  styleUrls: ["./ticket-correspondence.component.scss"]
})
export class TicketCorrespondenceComponent implements OnInit {
  showForm: boolean;
  loading: boolean;
  responseForm: FormGroup;
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });

  responses: any[] = [];
  ticketNumber: any;

  constructor(
    private app: AppService,
    private builder: FormBuilder,
    private dialogRef: MatDialog,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildForm();

    this.getTicketNumber();
  }
  buildForm = (): void => {
    this.responseForm = this.builder.group({
      response: [null, Validators.required]
    });
  };

  getTicketNumber = (): void => {
    this.activeRoute.params.subscribe(params => {
      this.ticketNumber = params.ticketnumber;
      this.loadResponsesForTicket(this.ticketNumber);
    });
  };

  respondActivate = (): void => {
    let dialog = this.dialogRef.open(TicketResponseModalComponent, {
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

  loadResponsesForTicket = ticketNumber => {
    this.loading = true;
    let url = `${this.app.BASE_URL}/tickets/responses/${ticketNumber}`;

    this.app.makeGetRequestWithParams(url, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.responses = response.data;
        }
        console.log(this.responses);
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  };

  get response() {
    return this.responseForm.get("response");
  }
}
