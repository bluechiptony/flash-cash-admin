import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-new-merchant",
  templateUrl: "./new-merchant.component.html",
  styleUrls: ["./new-merchant.component.scss"]
})
export class NewMerchantComponent implements OnInit {
  appForm: FormGroup;

  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm = (): void => {
    this.appForm = this.builder.group({
      businessName: ["", Validators.required],
      bankName: ["", Validators.required]
    });
  };

  get businessName() {
    return this.appForm.get("businessName");
  }
  get bankName() {
    return this.appForm.get("bankName");
  }
}
