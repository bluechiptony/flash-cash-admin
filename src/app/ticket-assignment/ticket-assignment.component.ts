import { Component, OnInit } from "@angular/core";
import { AppService } from "../application/services/app.service";
import { ActivatedRoute } from "@angular/router";
import { HttpParams, HttpHeaders } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-ticket-assignment",
  templateUrl: "./ticket-assignment.component.html",
  styleUrls: ["./ticket-assignment.component.scss"]
})
export class TicketAssignmentComponent implements OnInit {
  ticketNumber: any;
  loading: boolean;
  pageNumber: any = 0;
  pageSize: any = 0;
  users: any[] = [];
  userFormatted: any[] = [];

  //Fropdown Settings

  selectForm: FormGroup;
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

  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  userAssignments: any[] = [];

  constructor(
    private app: AppService,
    private activeRoute: ActivatedRoute,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.buildForm();
    this.getTicketNumber();

    this.getUsersFromRemote();
  }

  buildForm = () => {
    this.selectForm = this.builder.group({
      selectedUsers: [null, Validators.required]
    });
  };
  getTicketNumber = (): void => {
    this.activeRoute.params.subscribe(params => {
      this.ticketNumber = params.ticketnumber;
      this.getTicketAssignments(this.ticketNumber);
    });
  };

  getTicketAssignments = (ticketNumber): void => {
    this.loading = true;
    var url = this.app.BASE_URL + `/tickets/ticket/assignments/${ticketNumber}`;
    let params = new HttpParams()
      .set("pagenumber", this.pageNumber)
      .set("pagesize", this.pageSize);
    console.log(url);

    this.app.makeGetRequestWithParams(url, this.headers).subscribe(
      data => {
        this.loading = false;
        console.log(data);
        let response: any = data;
        if (response.success) {
          if (Array.isArray(response.data) && response.data.length > 0) {
            this.userAssignments = response.data;
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

  handleSubmit() {
    this.submitted = true;
    if (this.selectForm.valid) {
      let users = this.selectForm.value;
      users = users.selectedUsers;
      let usersFound = users.map(user => {
        return user.userCode;
      });

      console.log(usersFound);
      this.assignTicket(this.ticketNumber, usersFound);
    } else {
    }
  }
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

  //Assigns created ticket to users
  assignTicket = (ticketNumber: string, asignees: any[]): void => {
    let assigneesForm = asignees.map(assignee => {
      return assignee;
    });
    let assignment = {
      ticketNumber: ticketNumber,
      selectedUsers: assigneesForm
    };
    this.loading = true;
    let url = this.app.BASE_URL + "/tickets/assign";
    this.app.makePostRequest(url, assignment, this.headers).subscribe(
      data => {
        this.loading = false;
        let response: any = data;
        if (response.success) {
          this.app.showSuccessMessage(response.message);
          this.getTicketAssignments(this.ticketNumber);
        } else {
          this.app.showWarningMessage("It seems something went wrong");
        }
      },
      error => {
        this.loading = false;
        console.log(error);

        this.app.processError(error);
      }
    );
  };

  onItemSelect(item: any) {
    // console.log("onItemSelect", item);
  }
  onSelectAll(items: any) {
    // console.log("onSelectAll", items);
  }

  get selectedUsers() {
    return this.selectForm.get("selectedUsers");
  }
}
