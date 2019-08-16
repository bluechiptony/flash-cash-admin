import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from "@angular/material";
import { AppService } from "src/app/application/services/app.service";
import { DataService } from "src/app/application/services/data.service";
import { Router } from "@angular/router";
import { UserModalComponent } from "src/app/modals/user-modal/user-modal.component";

@Component({
  selector: "app-user-table",
  templateUrl: "./user-table.component.html",
  styleUrls: ["./user-table.component.scss"]
})
export class UserTableComponent implements OnInit {
  transactions: any[];
  displayedTableHeaders: string[] = [
    "reference",
    "date",
    // "time",
    "service",
    "amount",
    "serviceCharge"
    // "total"
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
    setTimeout(() => {
      this.loadDataSource(this.data.transctions);
    }, 1500);
  }

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

  openCustomerPage = (transaction: any): void => {
    this.router.navigate(["/dashboard", "customer", transaction.reference]);
    // let dialog = this.dialogRef.open(TransactionModalComponent, {
    //   width:"600px",
    //   data:{
    //     transaction:transaction
    //   }
    // });
    // dialog.afterClosed().subscribe(result=>{
    // });
  };

  openNewCustomerModal = () => {
    let transaction: any = {};
    let dialog = this.dialogRef.open(UserModalComponent, {
      width: "600px",
      data: {
        transaction: transaction
      }
    });
    dialog.afterClosed().subscribe(result => {});
  };
}
