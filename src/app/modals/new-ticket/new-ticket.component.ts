import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserModalComponent } from "../user-modal/user-modal.component";
import { AppService } from "src/app/application/services/app.service";
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Component({
  selector: "app-new-ticket",
  templateUrl: "./new-ticket.component.html",
  styleUrls: ["./new-ticket.component.scss"]
})
export class NewTicketComponent implements OnInit {
  pageSize: any = 0;
  pageNumber: any = 0;
  requestUrl: string;
  solutions: any[] = [];
  issues: any[] = [];
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });

  appForm: FormGroup;
  user: any = {};
  loading: boolean;
  isSubmitted: boolean;
  loggedInUser = this.app.getLoggedInUser();

  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  submitted: boolean;
  selectedItems: any[] = [];
  dropdownSettings: any = {
    singleSelection: false,
    idField: "userCode",
    textField: "fullName",
    selectAllText: "Select All",
    unSelectAllText: "Deselect All",
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  users: any[] = [];
  userFormatted: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private app: AppService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.getSolutions();
    this.getUsersFromRemote();
    this.buildForm();
  }

  buildForm = () => {
    this.appForm = this.formBuilder.group({
      customerName: ["", Validators.required],
      phoneNumber: [
        "",
        Validators.compose([
          Validators.pattern(this.app.phoneRegex),
          Validators.required
        ])
      ],
      customerEmailAddress: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(this.app.emailRegex)
        ])
      ],
      issue: [null, Validators.required],
      subject: ["", Validators.required],
      solution: [null, Validators.required],
      selectedUsers: [null, Validators.required],
      description: ["", Validators.required]
    });
  };
  cancel() {
    this.dialogRef.close();
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.appForm.valid) {
      let ticket: any = this.appForm.value;
      ticket.creator = this.loggedInUser.userCode;
      console.log(ticket);
      this.createTicket(ticket);
    } else {
      this.app.showWarningMessage("Please review your submission.");
    }
  }

  createTicket(ticket: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/tickets/create";
    this.app.makePostRequest(this.requestUrl, ticket, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        console.log(response);

        if (response.success) {
          this.app.showSuccessMessage(response.message);
          if (
            Array.isArray(ticket.selectedUsers) &&
            ticket.selectedUsers.length > 0
          ) {
            let ticketNumber = response.data.ticketNumber;
            this.assignTicket(ticketNumber, ticket.selectedUsers);
          }
        } else {
          this.app.showWarningMessage("It seems something went wrong");
        }
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  }

  updateUser(ticket: any) {
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/tickets/create/account";
    // ticket.id = this.ticket.id;
    this.app.makePutRequest(this.requestUrl, ticket).subscribe(
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

  //Assigns created ticket to users
  assignTicket = (ticketNumber: string, asignees: any[]): void => {
    let assigneesForm = asignees.map(assignee => {
      return assignee.userCode;
    });
    let assignment = {
      ticketNumber: ticketNumber,
      selectedUsers: assigneesForm
    };
    this.loading = true;
    this.requestUrl = this.app.BASE_URL + "/tickets/assign";
    this.app
      .makePostRequest(this.requestUrl, assignment, this.headers)
      .subscribe(
        data => {
          this.loading = false;
          let response: any = data;
          if (response.success) {
            this.app.showSuccessMessage(response.message);
            this.dialogRef.close();
          } else {
            this.app.showWarningMessage("It seems something went wrong");
          }
        },
        error => {
          this.loading = false;
          this.app.processError(error);
        }
      );
  };

  /**
   * Get Issues for solutions
   */
  getIssues = (solutionCode): void => {
    let url = `${this.app.BASE_URL}/issues/get/solution/${solutionCode}`;
    this.app.makeGetRequest(url, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.issues = response.data;
          } else {
          }
        } else {
        }
      },
      error => {
        this.loading = false;
        this.app.processError(error);
      }
    );
  };

  /**
   * Gets solutions
   */
  getSolutions = (): void => {
    this.loading = true;
    var url = this.app.BASE_URL + "/solutions/get";
    console.log(url);

    this.app.makeGetRequest(url).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        let response: any = data;
        if (response.success) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.solutions = response.data;
          } else {
          }
        } else {
        }
      },
      error => {
        this.loading = false;

        this.app.processError(error);
      }
    );
  };

  getUsersFromRemote = () => {
    this.loading = true;
    var url = this.app.BASE_URL + "/user/get";
    let params = new HttpParams()
      .set("pagenumber", this.pageNumber)
      .set("pagesize", this.pageSize);
    console.log(url);

    this.app.makeGetRequestWithParams(url, this.headers, params).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        let response: any = data;
        if (response.success) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.users = response.data;
            this.userFormatted = this.users.map(user => {
              user.fullName = `${user.firstName} ${user.lastName}`;
            });
          } else {
          }
        } else {
        }
      },
      error => {
        this.app.processError(error);
        console.log(error);
      }
    );
  };

  onItemSelect(item: any) {
    console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    console.log("onSelectAll", items);
  }

  get selectedUsers() {
    return this.appForm.get("selectedUsers");
  }

  get customerName() {
    return this.appForm.get("customerName");
  }

  get customerEmailAddress() {
    return this.appForm.get("customerEmailAddress");
  }
  get issue() {
    return this.appForm.get("issue");
  }

  get solution() {
    return this.appForm.get("solution");
  }
  get phoneNumber() {
    return this.appForm.get("phoneNumber");
  }
  get subject() {
    return this.appForm.get("subject");
  }
  get description() {
    return this.appForm.get("description");
  }
}
