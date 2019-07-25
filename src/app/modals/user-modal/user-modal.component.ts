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
import { AccountTypes } from "src/app/application/modules/usergopos/usergopos.module";

@Component({
  selector: "app-user-modal",
  templateUrl: "./user-modal.component.html",
  styleUrls: ["./user-modal.component.scss"]
})
export class UserModalComponent implements OnInit {
  requestUrl: string;
  lgas: any[] = [];
  // accountTypes = ["ADMINISTRATOR", "SALES", "REVIEW"];
  accountTypes = Object.keys(AccountTypes);
  appForm: FormGroup;
  user: any = {};
  loading: boolean;
  isSubmitted: boolean;
  accountTypeSelect: any;
  userEmailAddress: string;
  headers = this.app.getSimpleAuthHeader();

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
      firstName: [this.user!.firstName, Validators.required],
      lastName: [this.user!.lastName, Validators.required],
      emailAddress: [
        this.user!.emailAddress,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      phoneNumber: [
        this.user!.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.phoneRegex)
        ])
      ],
      accountType: [this.user!.accountType, Validators.required]
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
      this.userEmailAddress = user.emailAddress;
      this.accountTypeSelect = user.accountType;

      if (this.data.edit) {
        console.log(user);

        this.updateUser(user);
      } else {
        this.createUser(user);
      }
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  createUser(user: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/users/create";
    this.app.makePostRequest(this.requestUrl, user, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.app.showSuccessMessage("User account successfully Created");
          if (response.data.userCode !== undefined) {
            this.createActivation(response.data.userCode);
          } else {
            this.app.showWarningMessage("Could not notify User");
          }
        }
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

  createActivation = (userCode: any): void => {
    this.loading = true;
    this.requestUrl = `${this.app.BASE_URL}/auth/create/authentication`;
    let auth = {
      emailAddress: this.userEmailAddress,
      userCode: userCode,
      accountType: this.accountTypeSelect
    };

    console.log(auth);

    this.app.makePostRequest(this.requestUrl, auth, this.headers).subscribe(
      data => {
        let response: any = data;
        if (response.success) {
          this.app.showSuccessMessage(response.message);
          this.dialogRef.close();
        } else {
        }
      },
      error => {
        console.log(error);
        this.app.processError(error);
      }
    );
  };

  get firstName() {
    return this.appForm.get("firstName");
  }

  get lastName() {
    return this.appForm.get("lastName");
  }
  get emailAddress() {
    return this.appForm.get("emailAddress");
  }
  get phoneNumber() {
    return this.appForm.get("phoneNumber");
  }

  get accountType() {
    return this.appForm.get("accountType");
  }
}
