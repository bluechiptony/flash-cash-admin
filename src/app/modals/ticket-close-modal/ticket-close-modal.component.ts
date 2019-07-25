import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AppService } from "src/app/application/services/app.service";

@Component({
  selector: "app-ticket-close-modal",
  templateUrl: "./ticket-close-modal.component.html",
  styleUrls: ["./ticket-close-modal.component.scss"]
})
export class TicketCloseModalComponent implements OnInit {
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
    private dialogRef: MatDialogRef<TicketCloseModalComponent>,
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
      remark: [this.solution!.firstName, Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close(false);
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      let response = this.appForm.value;

      response.resolverUserCode = this.loggedInUser.userCode;
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
    this.requestUrl = this.app.BASE_URL + "/tickets/close";
    this.app.makePutRequest(this.requestUrl, response, this.headers).subscribe(
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

  get remark() {
    return this.appForm.get("remark");
  }
  get showCustomer() {
    return this.appForm.get("showCustomer");
  }
}
