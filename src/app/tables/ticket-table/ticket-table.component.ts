import { Component, OnInit, ViewChild, Input } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { AppService } from "src/app/application/services/app.service";
import { DataService } from "src/app/application/services/data.service";
import { NewTicketComponent } from "src/app/modals/new-ticket/new-ticket.component";
import { HttpHeaders, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { TicketTableSets } from "src/app/application/modules/usergopos/usergopos.module";

@Component({
  selector: "app-ticket-table",
  templateUrl: "./ticket-table.component.html",
  styleUrls: ["./ticket-table.component.scss"]
})
export class TicketTableComponent implements OnInit {
  @Input("tableSet") tableSet: any;
  tickets: any[];
  pageNumber: any = 1;
  pageSize: any = 20;
  requesturl: string = this.app.BASE_URL + "/tickets/get";
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  loggedInUser = this.app.getLoggedInUser();
  displayedTableHeaders: string[] = [
    "reference",
    "date",
    // "time",
    "service",
    "amount",
    "serviceCharge",
    "total"
    // "status"
  ];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    private app: AppService,
    private data: DataService,
    private dialogRef: MatDialog,
    private router: Router
  ) {}

  hasData: boolean;
  hasError: boolean;
  loading: boolean;

  ngOnInit() {
    this.loading = true;
    this.setUpRequest();
    this.getTicketsFromRemote();
  }

  setUpRequest = (): void => {
    if (this.tableSet === TicketTableSets.OPEN) {
      this.requesturl = this.app.BASE_URL + "/tickets/get/open";
    } else if (this.tableSet === TicketTableSets.USER) {
      this.requesturl =
        this.app.BASE_URL +
        `/tickets/user/assignments/${this.loggedInUser.userCode}`;
    } else if (this.tableSet === TicketTableSets.ALL) {
      this.requesturl = this.app.BASE_URL + "/tickets/get";
    } else {
      this.requesturl = this.app.BASE_URL + "/tickets/get";
    }
  };

  /** Sets up Paginator and Sorter for the resultant table*/
  setUpPaginatorAndSorter(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Searched through datasource collection
   * @param filter
   */
  applyFilter(filter: string) {
    if (filter.length >= 0) {
      this.dataSource.filter = filter.trim().toLowerCase();
    }
  }

  openTicket = ticket => {
    this.router.navigate(["/dashboard", "ticket", ticket.ticketNumber]);
  };

  loadDataSource = (data: any[]) => {
    this.loading = false;
    if (data.length > 0) {
      this.dataSource = new MatTableDataSource(data);
      this.hasData = true;
      this.hasError = false;
    } else {
      this.hasData = false;
      this.hasError = false;
    }

    this.setUpPaginatorAndSorter();
  };

  getTicketsFromRemote = (): void => {
    this.loading = true;
    let params = new HttpParams()
      .set("pagesize", this.pageSize)
      .set("pagenumber", this.pageNumber);

    this.app
      .makeGetRequestWithParams(this.requesturl, this.headers, params)
      .subscribe(
        data => {
          let response: any = data;
          console.log(response);

          if (response.success) {
            if (Array.isArray(response.data) && response.data.length > 0) {
              this.loadDataSource(response.data);
              this.hasData = true;
              this.hasError = false;
              this.pageNumber++;
            } else {
              this.hasData = false;
              this.hasError = false;
            }
          } else {
            this.hasData = false;
            this.hasError = true;
          }
        },
        error => {
          this.loading = false;
          console.log(error);

          this.app.processError(error);
          this.hasData = false;
          this.hasError = true;
        }
      );
  };
  openNewTicket = (): void => {
    let dialog = this.dialogRef.open(NewTicketComponent, {
      width: "1000px"
    });
    dialog.afterClosed().subscribe(result => {});
  };
}
