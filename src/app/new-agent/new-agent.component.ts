import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppService } from "../application/services/app.service";

@Component({
  selector: "app-new-agent",
  templateUrl: "./new-agent.component.html",
  styleUrls: ["./new-agent.component.scss"]
})
export class NewAgentComponent implements OnInit {
  appForm: FormGroup;
  states: any[] = [];
  lgas: any[] = [];
  loadingLgas: boolean;
  loading: boolean;
  submitted: boolean;
  constructor(private formBuilder: FormBuilder, private app: AppService) {
    this.getStates();
    this.buildForm();
  }

  buildForm = (): void => {
    this.appForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      phoneNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.phoneRegex)
        ])
      ],
      emailAddress: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      stateId: ["", Validators.required],
      lgaId: ["", Validators.required],
      city: [""],
      address: ["", Validators.required],
      businessName: [""],
      businessAddress: [""]
    });
  };

  getStates = (): void => {
    let url = this.app.BASE_URL + "/states/get";

    this.app.makeGetRequest(url).subscribe(
      data => {
        if (Array.isArray(data)) {
          this.states = data;
          console.log(this.states);
        }
      },
      error => {
        console.log(error);
      }
    );
  };

  getLgasForState = (stateId): void => {
    console.log(stateId);
    this.loadingLgas = true;
    let url = this.app.BASE_URL + "/lgas/state/" + stateId;
    this.app.makeGetRequest(url).subscribe(
      data => {
        this.loadingLgas = false;
        if (Array.isArray(data)) {
          this.lgas = data;
          console.log(this.lgas);
        }
      },
      error => {
        this.loadingLgas = false;
        console.log(error);
      }
    );
  };

  ngOnInit() {
    this.buildForm();
  }

  handleSubmit = (): void => {
    this.submitted = true;
    if (this.appForm.valid) {
      let agent = this.appForm.value;
      console.log(agent);
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  };

  get fullName() {
    return this.appForm.get("fullName");
  }
  get phoneNumber() {
    return this.appForm.get("phoneNumber");
  }
  get emailAddress() {
    return this.appForm.get("emailAddress");
  }
  get stateId() {
    return this.appForm.get("stateId");
  }
  get lgaId() {
    return this.appForm.get("lgaId");
  }
  get city() {
    return this.appForm.get("city");
  }
  get physicalAddress() {
    return this.appForm.get("address");
  }
  get businessName() {
    return this.appForm.get("businessName");
  }

  get businessAddress() {
    return this.appForm.get("businessAddress");
  }
}
