import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { WebsiteComponent } from './website/website.component';
import { ReportRoutingModule } from './report-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbDropdownModule, NgbModalModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UIModule } from 'src/app/shared/ui/ui.module';
import { DashboardsModule } from '../dashboards/dashboards.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
    declarations: [UserComponent, WebsiteComponent, UserDetailComponent],
    imports: [
        CommonModule,
        ReportRoutingModule,
        NgSelectModule,
        NgbDropdownModule,
        NgbModalModule,
        NgApexchartsModule,
        NgbNavModule,
        NgbTooltipModule,
        NgxPaginationModule,
        NgxDropzoneModule,
        FormsModule,
        UIModule,
        ReactiveFormsModule,
        DashboardsModule,
        HttpClientModule,
        FullCalendarModule,
        SimplebarAngularModule,
        Ng2FlatpickrModule,
    ],
})
export class ReportModule {}
