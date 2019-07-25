import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpHeaders } from "@angular/common/http";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import { AppService } from "src/app/application/services/app.service";

@Component({
  selector: "app-new-issue-category",
  templateUrl: "./new-issue-category.component.html",
  styleUrls: ["./new-issue-category.component.scss"]
})
export class NewIssueCategoryComponent implements OnInit {
  requestUrl: string;
  solutions: any[] = [];
  accountTypes = ["ADMINISTRATOR", "SALES", "REVIEW"];
  appForm: FormGroup;
  issue: any = {};
  loading: boolean;
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  isSubmitted: boolean;
  constructor(
    private dialogRef: MatDialogRef<NewIssueCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getSolutions();
    if (this.data.edit) {
      this.issue = this.data.issue;
    }
    this.buildForm();
  }

  buildForm = () => {
    this.appForm = this.formBuilder.group({
      name: [this.issue!.name, Validators.required],
      solution: [this.issue!.solution, Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      let issue = this.appForm.value;

      if (this.data.edit) {
        this.updateSolution(issue);
      } else {
        this.createIssue(issue);
      }
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  getSolutions = (): void => {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/solutions/get";
    this.app.makeGetRequestWithParams(this.requestUrl, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.solutions = response.data;
          console.log(this.solutions);
        } else {
        }
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  };

  createIssue(issue: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/issues/create";
    this.app.makePostRequest(this.requestUrl, issue, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.app.showSuccessMessage("Solution successfully Created");
          this.dialogRef.close();
        } else {
        }
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  }

  updateSolution(issue: any) {
    this.loading = true;
    this.requestUrl = `${this.app.BASE_URL}/issue/update/${
      this.issue.issueCode
    }`;
    issue.id = this.issue.id;
    this.app.makePutRequest(this.requestUrl, issue).subscribe(
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
  get solution() {
    return this.appForm.get("solution");
  }
}
