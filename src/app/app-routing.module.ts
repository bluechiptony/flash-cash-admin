import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { SetPasswordComponent } from "./set-password/set-password.component";
import { NotAllowedComponent } from "./not-allowed/not-allowed.component";
import { FourOFourComponent } from "./four-o-four/four-o-four.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MerchantsComponent } from "./merchants/merchants.component";
import { OverviewComponent } from "./overview/overview.component";
import { AgentsComponent } from "./agents/agents.component";
import { UsersComponent } from "./users/users.component";
import { NewMerchantComponent } from "./new-merchant/new-merchant.component";
import { NewAgentComponent } from "./new-agent/new-agent.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { IssuesCategoriesComponent } from "./issues-categories/issues-categories.component";
import { SolutionsComponent } from "./solutions/solutions.component";
import { TicketComponent } from "./ticket/ticket.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "activate-account/:code", component: SetPasswordComponent },
  { path: "reset-password/:code", component: SetPasswordComponent },
  { path: "not-allowed", component: NotAllowedComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      { path: "overview", component: OverviewComponent },
      { path: "", component: OverviewComponent },
      { path: "tickets", component: TicketsComponent },
      { path: "ticket/:ticketnumber", component: TicketComponent },
      { path: "solutions", component: SolutionsComponent },
      { path: "issue-categories", component: IssuesCategoriesComponent },
      { path: "merchants", component: MerchantsComponent },
      { path: "new-merchant", component: NewMerchantComponent },
      { path: "new-agent", component: NewAgentComponent },
      { path: "agents", component: AgentsComponent },
      { path: "users", component: UsersComponent }
    ]
  },
  { path: "**", component: FourOFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
