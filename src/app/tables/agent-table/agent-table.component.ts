import { Component, OnInit, ViewChild } from "@angular/core";
// import { Transaction } from "src/app/application/modules/goteller-merchant/goteller-merchant.module";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { AppService } from "src/app/application/services/app.service";
import { DataService } from "src/app/application/services/data.service";
import { MatDialogRef, MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-agent-table",
  templateUrl: "./agent-table.component.html",
  styleUrls: ["./agent-table.component.scss"]
})
export class AgentTableComponent implements OnInit {
  transactions: any[];
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
    private dialogRef: MatDialog
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

  openTransactionModal = (transaction: any): void => {
    // let dialog = this.dialogRef.open(TransactionModalComponent, {
    //   width:"600px",
    //   data:{
    //     transaction:transaction
    //   }
    // });
    // dialog.afterClosed().subscribe(result=>{
    // });
  };
}
