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
      firstName: [this.user!.firstName, Validators.required],
      lastName: [this.user!.lastName, Validators.required],
      customerEmailAddress: [
        this.user!.customerEmailAddress,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      issueCategory: [
        this.user!.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.phoneRegex)
        ])
      ],
      solution: [this.user!.accountType, Validators.required],
      issueDescription: [this.user!.accountType, Validators.required]
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

      if (this.data.edit) {
        console.log(user);

        // this.updateUser(user);
      } else {
        // this.createUser(user);
      }
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  createUser(user: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/users/create/account";
    this.app.makePostRequest(this.requestUrl, user).subscribe(
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

  updateUser(user: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/users/create/account";
    user.id = this.user.id;
    this.app.makePutRequest(this.requestUrl, user).subscribe(
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

  get firstName() {
    return this.appForm.get("customerName");
  }

  get lastName() {
    return this.appForm.get("lastName");
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