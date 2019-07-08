import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Observable } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AppService } from "src/app/application/services/app.service";
import { DataService } from "src/app/application/services/data.service";
import { UserModalComponent } from "src/app/modals/user-modal/user-modal.component";

@Component({
  selector: "app-user-collection",
  templateUrl: "./user-collection.component.html",
  styleUrls: ["./user-collection.component.scss"]
})
export class UserCollectionComponent implements OnInit {
  users: any[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayCollection: Observable<any>;
  loading: boolean;

  hasData: boolean;
  hasError: boolean;

  constructor(
    private app: AppService,
    private dialog: MatDialog,
    private data: DataService
  ) {}

  ngOnInit() {
    this.loading = true;

    setTimeout(() => {
      this.loadDataSource(this.data.users);
    }, 3000);
    // this.getUsersFromRemote(true, true);
  }

  setUpPaginatorAndSorter() {
    // throw new Error("Method not implemented.");
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Searched through dataSource collection
   * @param filter
   */
  applyFilter(filter: string) {
    if (filter.length >= 0) {
      this.dataSource.filter = filter.trim().toLowerCase();
    }
  }

  openNewUserModal = (user?: any): void => {
    let data: any = {};
    if (user != null) {
      data.edit = true;
      data.user = user;
    } else {
      data.edit = false;
    }
    console.log(data);
    let dialog = this.dialog.open(UserModalComponent, {
      width: "500px",
      data: data
    });
    dialog.afterClosed().subscribe(result => {
      // this.getUsersFromRemote(false, true);
    });
  };

  loadDataSource = (data: any[]) => {
    this.loading = false;
    if (data.length > 0) {
      this.dataSource = new MatTableDataSource(data);
      this.hasData = true;
      this.hasError = false;
      this.displayCollection = this.dataSource.connect();
      this.setUpPaginatorAndSorter();
    } else {
      this.hasData = false;
      this.hasError = false;
    }
  };

  getUsersFromRemote = (load: boolean, clear: boolean) => {
    if (load) {
      this.loading = true;
    }

    if (clear) {
      this.users = [];
    }
    let url = this.app.BASE_URL + "/users/operational/get";
    // this.app.makeGetRequest(url).subscribe(
    //   data => {
    //     this.loading = false;
    //     if (Array.isArray(data)) {
    //       data.forEach(user => {
    //         this.users.push(user);
    //       });
    //       this.dataSource = new MatTableDataSource(this.users);
    //       this.displayCollection = this.dataSource.connect();
    //       this.setUpPaginatorAndSorter();
    //     }
    //   },
    //   error => {
    //     this.loading = false;
    //     // this.app.processError(error);
    //   }
    // );
  };
}
