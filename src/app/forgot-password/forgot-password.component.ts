import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../application/services/app.service";
import { isGeneratedFile } from "@angular/compiler/src/aot/util";

@Component({
  selector: "app-forgot-password",
  templateUrl: "./forgot-password.component.html",
  styleUrls: ["./forgot-password.component.scss"]
})
export class ForgotPasswordComponent implements OnInit {
  signUpForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  constructor(private app: AppService, private builder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm = (): void => {
    this.signUpForm = this.builder.group({
      emailAddress: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ]
    });
  };

  handleSubmit = (): void => {
    this.submitted = true;
    if (this.signUpForm.valid) {
      let user = this.signUpForm.value;
      this.recoverRemote(user);
    } else {
    }
  };

  recoverRemote = (userDetails: any): void => {
    let url = this.app.BASE_URL + "/auth/password-recover";
    this.loading = true;

    this.app.makePostRequest(url, userDetails).subscribe(
      data => {
        console.log(data);
        this.loading = false;

        if (data.success) {
          this.app.showSuccessMessage(
            `A recovery email has been successfully sent to ${
              userDetails.emailAddress
            }`
          );
        } else {
          this.app.showWarningMessage("Something Went wrong");
        }
      },
      error => {
        this.loading = false;
        console.log(error);
        this.app.showErrorMessage("Unable to update account");
      }
    );
  };

  get emailAddress() {
    return this.signUpForm.get("emailAddress");
  }
}
