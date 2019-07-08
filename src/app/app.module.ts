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
// import { MatCheckboxModule } from "@angular/material/checkbox";
import "hammerjs";

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
    UserModalComponent
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
    MatDialogModule
  ],
  providers: [DatePipe, CurrencyPipe, CookieService, AppService, DataService],
  entryComponents: [UserModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
