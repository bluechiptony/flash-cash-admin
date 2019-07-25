import { Component, OnInit, ViewChild } from "@angular/core";
import { AppService } from "src/app/application/services/app.service";
import { HttpHeaders } from "@angular/common/http";
import { MatTableDataSource, MatPaginator, MatDialog } from "@angular/material";
import { Observable } from "rxjs";
import { NewSolutionComponent } from "src/app/modals/new-solution/new-solution.component";

@Component({
  selector: "app-solution-collection",
  templateUrl: "./solution-collection.component.html",
  styleUrls: ["./solution-collection.component.scss"]
})
export class SolutionCollectionComponent implements OnInit {
  headers = new HttpHeaders({
    Authorization: this.app.getLoggedInUserToken()
  });
  solutions: any[] = [];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayCollection: Observable<any>;
  loading: boolean;

  hasData: boolean;
  hasError: boolean;

  constructor(private app: AppService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getSolutions();
    console.log(this.headers);
    console.log(this.app.getSimpleAuthHeader());
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
            this.loadDataSource(response.data);
            this.hasData = true;
            this.hasError = false;
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
        this.hasData = false;
        this.hasError = true;
        this.app.processError(error);
      }
    );
  };

  /**
   * Opens new modal solution
   */
  openNewSolution = (solution?: any): void => {
    let data: any = {};
    if (solution != null) {
      data.edit = true;
      data.solution = solution;
    } else {
      data.edit = false;
    }
    console.log(data);
    let dialog = this.dialog.open(NewSolutionComponent, {
      width: "500px",
      data: data
    });
    dialog.afterClosed().subscribe(result => {
      // this.getUsersFromRemote(false, true);
    });
  };
}
