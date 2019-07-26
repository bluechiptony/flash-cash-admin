import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [],
  imports: [CommonModule]
})
export class UsergoposModule {}

export enum AccountTypes {
  ADMINISTRATOR = "ADMINISTRATOR",
  SUPPORT = "SUPPORT",
  REVIEWER = "REVIEWER"
}

export enum TicketTableSets {
  ALL = "all",
  OPEN = "open",
  USER = "user"
}
