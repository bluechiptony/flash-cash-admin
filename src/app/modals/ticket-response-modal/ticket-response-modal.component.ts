import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AppService } from "src/app/application/services/app.service";

@Component({
  selector: "app-ticket-response-modal",
  templateUrl: "./ticket-response-modal.component.html",
  styleUrls: ["./ticket-response-modal.component.scss"]
})
export class TicketResponseModalComponent implements OnInit {
  requestUrl: string;
  lgas: any[] = [];
  accountTypes = ["ADMINISTRATOR", "SALES", "REVIEW"];
  appForm: FormGroup;
  solution: any = {};
  loading: boolean;
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  loggedInUser = this.app.getLoggedInUser();
  isSubmitted: boolean;
  ticketNumber: string;
  constructor(
    private dialogRef: MatDialogRef<TicketResponseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.edit) {
      this.solution = this.data.solution;
    } else {
      this.ticketNumber = this.data.ticketNumber;
    }
    this.buildForm();
  }

  buildForm = () => {
    this.appForm = this.formBuilder.group({
      response: [this.solution!.firstName, Validators.required],
      showCustomer: [false, Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close(false);
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      let response = this.appForm.value;
      response.respondeeEmailAddress = this.loggedInUser.emailAddress;
      response.respondeeUserCode = this.loggedInUser.userCode;
      response.ticketNumber = this.ticketNumber;

      if (this.data.edit) {
        this.updateSolution(response);
      } else {
        this.createResponse(response);
      }
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  createResponse(response: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/tickets/response/create";
    this.app.makePostRequest(this.requestUrl, response, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.app.showSuccessMessage(response.message);
          this.dialogRef.close(true);
        } else {
        }
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  }

  updateSolution(response: any) {
    this.loading = true;
    this.requestUrl = `${this.app.BASE_URL}/responses/update/${
      this.solution.solutionCode
    }`;
    // response.id = this.response.id;
    this.app.makePutRequest(this.requestUrl, response).subscribe(
      data => {
        this.loading = false;
        this.app.showSuccessMessage("Solution successfully Updated");
        this.dialogRef.close();
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  }

  get response() {
    return this.appForm.get("response");
  }
  get showCustomer() {
    return this.appForm.get("showCustomer");
  }
}
