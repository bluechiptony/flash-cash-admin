import { Component, OnInit } from "@angular/core";
import { AppService } from "../application/services/app.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  loginForm: FormGroup;
  loading: boolean;
  hasLoginError: boolean;
  loginError: string = "";

  constructor(private app: AppService, private builder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm = (): void => {
    this.loginForm = this.builder.group({
      emailAddress: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      password: ["", Validators.required]
    });
  };

  handleSubmit = (): void => {
    this.submitted = true;
    if (this.loginForm.valid) {
      let user = this.loginForm.value;
      this.makeLoginRequest(user);
    }
  };

  makeLoginRequest = (user: any): void => {
    this.loading = true;

    let url = this.app.BASE_URL + "/auth/login";
    console.log(user);
    console.log(url);
    this.app.makePostRequest(url, user).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        this.app.saveLoggedInUserToken(data.token);
        this.app.saveLoggedInUser(data);
      },
      error => {
        this.loading = false;
        this.hasLoginError = true;
        if (error.error.error !== undefined) {
          this.loginError = error.error.error;
        }
        this.app.processError(error);
        console.log(error);
      }
    );
  };

  get emailAddress() {
    return this.loginForm.get("emailAddress");
  }
  get password() {
    return this.loginForm.get("password");
  }
}
