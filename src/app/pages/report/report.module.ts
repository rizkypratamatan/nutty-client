import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { WebsiteComponent } from './website/website.component';
import { ReportRoutingModule } from './report-routing.module';



@NgModule({
  declarations: [UserComponent, WebsiteComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
