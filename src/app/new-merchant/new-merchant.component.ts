import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DataService } from "../application/services/data.service";
import { AppService } from "../application/services/app.service";

@Component({
  selector: "app-new-merchant",
  templateUrl: "./new-merchant.component.html",
  styleUrls: ["./new-merchant.component.scss"]
})
export class NewMerchantComponent implements OnInit {
  appForm: FormGroup;
  loading: boolean;
  banks: any[] = [];
  loadingLgas: boolean;
  lgas: any[] = [];
  states: any[] = [];
  submitted: boolean;
  hasServicable: boolean;
  shouldOpenAccount: boolean;
  merchant: any = {};
  constructor(
    private builder: FormBuilder,
    private data: DataService,
    private app: AppService
  ) {}

  ngOnInit() {
    this.banks = this.data.banks;
    this.getStates();
    this.buildForm();
  }

  buildForm = (): void => {
    this.appForm = this.builder.group({
      businessName: ["", Validators.required],
      contactName: ["", Validators.required],
      emailAddress: ["", Validators.pattern(this.app.emailRegex)],
      phoneNumber: [
        "",
        Validators.compose([Validators.required, Validators.required])
      ],
      stateId: ["", Validators.required],
      lgaId: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      hasServiceableAccount: [false],
      merchantBankName: [""],
      merchantAccountNumber: [""],
      openAccount: [false],
      desiredBankName: [""]
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

  alternateServicableAccount = (): void => {
    this.hasServicable = !this.hasServicable;
  };

  alternateCreateAccount = (): void => {
    this.shouldOpenAccount = !this.shouldOpenAccount;
    if (this.shouldOpenAccount) {
      this.appForm.controls["desiredBankName"].setValidators([
        Validators.required
      ]);
      this.appForm.controls["desiredBankName"].updateValueAndValidity();
      console.log("Set validators");
    } else {
      this.appForm.controls["desiredBankName"].setValidators(null);
      this.appForm.controls["desiredBankName"].updateValueAndValidity();
      console.log("Set validators null");
    }
  };

  handleSubmit = (): void => {
    this.submitted = true;
    if (this.appForm.valid) {
      let merchant = this.appForm.value;
      console.log(merchant);
      this.merchant = merchant;
      // this.enrollMerchant(merchant);
    } else {
    }
  };

  enrollMerchant = (merchant: any): void => {
    this.loading = true;
    let url = this.app.BASE_URL + "/merchant/create";

    this.app.makePostRequest(url, merchant).subscribe(
      data => {
        this.loading = false;
        let merchantCode = data.merchantCode;
        if (merchant.openAccount) {
          if (merchantCode != null && merchant.hasServiceableAccount) {
            this.openAccountRequestForMerchnt(
              merchantCode,
              merchant.desiredBankName
            );
          }
        } else if (merchant.hasServiceableAccount) {
        } else {
          this.app.showSuccessMessage("Merchant successfully created.");
        }
      },
      error => {
        this.loading = false;
      }
    );
  };

  openAccountRequestForMerchnt = (
    merchantCode: string,
    bankName: any
  ): void => {
    this.loading = true;
    let url = this.app.BASE_URL + "/merchant/account/request/" + merchantCode;
    let account = {
      bankName: bankName
    };

    this.app.makePostRequest(url, account).subscribe(
      data => {
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  };

  saveMerchantAccountDetails = (
    merchantCode: string,
    bankName: string,
    accountNumber: string
  ): void => {
    this.loading = true;
    let url = this.app.BASE_URL + "/merchant/account/create";
    let account = {
      bankName: bankName
    };

    this.app.makePostRequest(url, account).subscribe(
      data => {
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  };

  get businessName() {
    return this.appForm.get("businessName");
  }
  get contactName() {
    return this.appForm.get("contactName");
  }
  get emailAddress() {
    return this.appForm.get("emailAddress");
  }
  get phoneNumber() {
    return this.appForm.get("phoneNumber");
  }
  get stateId() {
    return this.appForm.get("stateId");
  }
  get lgaId() {
    return this.appForm.get("lgaId");
  }
  get address() {
    return this.appForm.get("address");
  }
  get city() {
    return this.appForm.get("city");
  }
  get hasServiceableAccount() {
    return this.appForm.get("hasServiceableAccount");
  }
  get merchantBankName() {
    return this.appForm.get("merchantBankName");
  }
  get merchantAccountNumber() {
    return this.appForm.get("merchantAccountNumber");
  }
  get openAccount() {
    return this.appForm.get("openAccount");
  }
  get desiredBankName() {
    return this.appForm.get("desiredBankName");
  }
}
