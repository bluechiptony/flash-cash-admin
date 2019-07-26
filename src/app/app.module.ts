import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { ToastrModule } from "ngx-toastr";
import { CookieService } from "ngx-cookie-service";
import { HttpClientModule } from "@angular/common/http";
import { DatePipe, CurrencyPipe } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
//import material components
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatDialogModule } from "@angular/material/dialog";
// import { MatSlideToggleModule } from "@angular/material/slide-toggle";
// import { MatRadioModule } from "@angular/material/radio";
import { MatCheckboxModule } from "@angular/material/checkbox";
import "hammerjs";

import { FroalaEditorModule, FroalaViewModule } from "angular-froala-wysiwyg";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FourOFourComponent } from "./four-o-four/four-o-four.component";
import { NotAllowedComponent } from "./not-allowed/not-allowed.component";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SetPasswordComponent } from "./set-password/set-password.component";
import { MessageComponent } from "./message/message.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { DashboardHeaderComponent } from "./dashboard-header/dashboard-header.component";
import { MerchantsComponent } from "./merchants/merchants.component";
import { MerchantTableComponent } from "./tables/merchant-table/merchant-table.component";
import { AgentTableComponent } from "./tables/agent-table/agent-table.component";
import { MerchantComponent } from "./merchant/merchant.component";
import { UserComponent } from "./user/user.component";
import { UserCollectionComponent } from "./collections/user-collection/user-collection.component";
import { NewMerchantComponent } from "./new-merchant/new-merchant.component";
import { NewAgentComponent } from "./new-agent/new-agent.component";
import { AgentsComponent } from "./agents/agents.component";
import { UsersComponent } from "./users/users.component";
import { OverviewComponent } from "./overview/overview.component";
import { AppService } from "./application/services/app.service";
import { DataService } from "./application/services/data.service";
import { UserModalComponent } from "./modals/user-modal/user-modal.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { TicketTableComponent } from "./tables/ticket-table/ticket-table.component";
import { NewTicketComponent } from "./modals/new-ticket/new-ticket.component";
import { TicketComponent } from "./ticket/ticket.component";
import { IssuesCategoriesComponent } from "./issues-categories/issues-categories.component";

import { NewIssueCategoryComponent } from "./modals/new-issue-category/new-issue-category.component";
import { SolutionCollectionComponent } from "./collections/solution-collection/solution-collection.component";
import { IssueCategoryCollectionComponent } from "./collections/issue-category-collection/issue-category-collection.component";
import { SolutionsComponent } from "./solutions/solutions.component";
import { NewSolutionComponent } from "./modals/new-solution/new-solution.component";
import { TicketCorrespondenceComponent } from "./ticket-correspondence/ticket-correspondence.component";
import { TicketResponseModalComponent } from "./modals/ticket-response-modal/ticket-response-modal.component";
import { TicketCloseModalComponent } from "./modals/ticket-close-modal/ticket-close-modal.component";
import { TicketAssignmentComponent } from "./ticket-assignment/ticket-assignment.component";

@NgModule({
  declarations: [
    AppComponent,
    FourOFourComponent,
    NotAllowedComponent,
    LoginComponent,
    ForgotPasswordComponent,
    SetPasswordComponent,
    MessageComponent,
    DashboardComponent,
    DashboardHeaderComponent,
    MerchantsComponent,
    MerchantTableComponent,
    AgentTableComponent,
    MerchantComponent,
    UserComponent,
    UserCollectionComponent,
    NewMerchantComponent,
    NewAgentComponent,
    AgentsComponent,
    UsersComponent,
    OverviewComponent,
    UserModalComponent,
    TicketsComponent,
    TicketTableComponent,
    NewTicketComponent,
    TicketComponent,
    IssuesCategoriesComponent,

    NewIssueCategoryComponent,

    IssueCategoryCollectionComponent,
    SolutionsComponent,
    SolutionCollectionComponent,
    NewSolutionComponent,
    TicketCorrespondenceComponent,
    TicketResponseModalComponent,
    TicketCloseModalComponent,
    TicketAssignmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCheckboxModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [DatePipe, CurrencyPipe, CookieService, AppService, DataService],
  entryComponents: [
    UserModalComponent,
    NewTicketComponent,
    NewIssueCategoryComponent,
    NewSolutionComponent,
    TicketResponseModalComponent,
    TicketCloseModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
