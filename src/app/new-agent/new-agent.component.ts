import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-new-agent",
  templateUrl: "./new-agent.component.html",
  styleUrls: ["./new-agent.component.scss"]
})
export class NewAgentComponent implements OnInit {
  appForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  buildForm = (): void => {
    this.appForm = this.formBuilder.group({
      fullName: ["", Validators.required],
      businessName: ["", Validators.required]
    });
  };

  ngOnInit() {
    this.buildForm();
  }

  get fullName() {
    return this.appForm.get("fullName");
  }
  get businessName() {
    return this.appForm.get("businessName");
  }
}
