import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { AppService } from "src/app/application/services/app.service";
import { HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-new-solution",
  templateUrl: "./new-solution.component.html",
  styleUrls: ["./new-solution.component.scss"]
})
export class NewSolutionComponent implements OnInit {
  requestUrl: string;
  lgas: any[] = [];
  accountTypes = ["ADMINISTRATOR", "SALES", "REVIEW"];
  appForm: FormGroup;
  solution: any = {};
  loading: boolean;
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  isSubmitted: boolean;
  constructor(
    private dialogRef: MatDialogRef<NewSolutionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    if (this.data.edit) {
      this.solution = this.data.solution;
    }
    this.buildForm();
  }

  buildForm = () => {
    this.appForm = this.formBuilder.group({
      name: [this.solution!.firstName, Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      let solution = this.appForm.value;

      if (this.data.edit) {
        this.updateSolution(solution);
      } else {
        this.createSolution(solution);
      }
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  createSolution(solution: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/solutions/create";
    this.app.makePostRequest(this.requestUrl, solution, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.app.showSuccessMessage("Solution successfully Created");
        } else {
        }
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  }

  updateSolution(solution: any) {
    this.loading = true;
    this.requestUrl = `${this.app.BASE_URL}/solutions/update/${
      this.solution.solutionCode
    }`;
    solution.id = this.solution.id;
    this.app.makePutRequest(this.requestUrl, solution).subscribe(
      data => {
        this.loading = false;
        this.app.showSuccessMessage("Solution successfully Updated");
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  }

  get name() {
    return this.appForm.get("name");
  }
}
