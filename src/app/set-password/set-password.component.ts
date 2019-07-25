import { Component, OnInit } from "@angular/core";
import { AppService } from "../application/services/app.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-set-password",
  templateUrl: "./set-password.component.html",
  styleUrls: ["./set-password.component.scss"]
})
export class SetPasswordComponent implements OnInit {
  passwordFormGroup: FormGroup;
  activationToken: string;
  loading: boolean;
  activateAccount: boolean;
  action: string;
  submitMessage: string;
  submitted: boolean;

  constructor(
    private app: AppService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder
  ) {}

  getCurrentroute = (): void => {
    let url = this.activeRoute.snapshot.url;
    if (url[0].path === "reset-password") {
      this.activateAccount = false;
      this.action = "enter your new password";
      this.submitMessage = "Reset password";
    } else if (url[0].path === "activate-account") {
      this.activateAccount = true;
      this.action = "enter your desired password to activate your account";
      this.submitMessage = "Activate Account";
    } else {
    }
    this.activationToken = url[1].path;
  };

  buildForm = (): void => {
    this.passwordFormGroup = this.builder.group({
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required]
    });
  };

  ngOnInit() {
    this.getCurrentroute();
    this.buildForm();
  }

  setPassword = (): void => {
    this.submitted = true;
    if (this.passwordFormGroup.valid) {
      let user = this.passwordFormGroup.value;

      if (user.password === user.confirmPassword) {
        user.activationToken = this.activationToken;
        delete user.confirmPassword;
        this.setPasswordRemote(user);
      } else {
        this.app.showWarningMessage("Sorry, your passwords do not match");
      }
    } else {
      this.app.showWarningMessage("Please review your entry");
    }
  };

  setPasswordRemote = (userDetails: any): void => {
    this.loading = true;
    // let url = this.app.BASE_URL + "/auth/activate-account";
    let url = this.app.BASE_URL + "/auth/activate-account";
    if (!this.activateAccount) {
      url = this.app.BASE_URL + "/auth/reset-password";
    }

    this.app.makePutRequest(url, userDetails).subscribe(
      data => {
        console.log(data);
        this.loading = false;

        if (data.success) {
          this.app.showSuccessMessage("Account has been successfully updated");
          this.router.navigate([""]);
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

  get password() {
    return this.passwordFormGroup.get("password");
  }
  get confirmPassword() {
    return this.passwordFormGroup.get("confirmPassword");
  }
}
