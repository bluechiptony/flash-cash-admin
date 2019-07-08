import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { AppService } from "src/app/application/services/app.service";
import {
  NgForm,
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"]
})
export class UserModalComponent implements OnInit {
  requestUrl: string;
  lgas: any[] = [];
  accountTypes = ["ADMINISTRATOR", "STAFF", "AGENT"];
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
    if (this.data.edit) {
      this.user = this.data.user;
    }
    this.buildForm();
  }

  buildForm = () => {
    this.appForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [
        this.user.emailAddress,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      phoneNumber: [
        this.user.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.phoneRegex)
        ])
      ]
      // accountType: [this.user.accountType, Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      this.appForm.value.lga = +this.appForm.value.lga;
      let user = this.appForm.value;
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
    return this.appForm.get("firstName");
  }

  get lastName() {
    return this.appForm.get("lastName");
  }
  get email() {
    return this.appForm.get("email");
  }
  get phoneNumber() {
    return this.appForm.get("phoneNumber");
  }

  get accountType() {
    return this.appForm.get("accountType");
  }
}
