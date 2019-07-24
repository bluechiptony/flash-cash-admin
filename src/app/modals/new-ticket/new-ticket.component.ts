import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserModalComponent } from "../user-modal/user-modal.component";
import { AppService } from "src/app/application/services/app.service";

@Component({
  selector: "app-new-ticket",
  templateUrl: "./new-ticket.component.html",
  styleUrls: ["./new-ticket.component.scss"]
})
export class NewTicketComponent implements OnInit {
  requestUrl: string;
  lgas: any[] = [];
  accountTypes = ["ADMINISTRATOR", "SALES", "REVIEW"];
  appForm: FormGroup;
  user: any = {};
  loading: boolean;
  isSubmitted: boolean;

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm = () => {
    this.appForm = this.formBuilder.group({
      customerName: ["", Validators.required],

      customerEmailAddress: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      issueCategory: ["", Validators.required],
      solution: ["", Validators.required],
      issueDescription: ["", Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      let user = this.appForm.value;
      console.log(user);
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  createTicket(ticket: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/tickets/create";
    this.app.makePostRequest(this.requestUrl, ticket).subscribe(
      data => {
        this.loading = false;
        this.app.showSuccessMessage("User account successfully Created");
      },
      error => {
        this.loading = false;
        // this.app.processError(error);
      }
    );
  }

  updateUser(ticket: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/tickets/create/account";
    // ticket.id = this.ticket.id;
    this.app.makePutRequest(this.requestUrl, ticket).subscribe(
      data => {
        this.loading = false;
        this.app.showSuccessMessage("User account successfully Updated");
      },
      error => {
        this.loading = false;
        // this.app.processError(error);
      }
    );
  }

  get customerName() {
    return this.appForm.get("customerName");
  }

  get customerEmailAddress() {
    return this.appForm.get("customerEmailAddress");
  }
  get issueCategory() {
    return this.appForm.get("issueCategory");
  }

  get solution() {
    return this.appForm.get("solution");
  }
  get issueDescription() {
    return this.appForm.get("issueDescription");
  }
}
