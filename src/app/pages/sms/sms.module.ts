import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SMSSentComponent } from './sent/sent.component';
import { SMSBulkComponent } from './bulk/bulk.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    NgbDropdownModule,
    NgbModalModule,
    NgbNavModule,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { UIModule } from 'src/app/shared/ui/ui.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardsModule } from '../dashboards/dashboards.module';
import { HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SmsRoutingModule } from './sms-routing.module';
import { HistoryComponent } from './history/history.component';
import { UserTableFilterPipe } from '../user/table-filter.pipe';

@NgModule({
    declarations: [
        SMSSentComponent,
        SMSBulkComponent,
        HistoryComponent,
        // UserTableFilterPipe
    ],
    imports: [
        CommonModule,
        SmsRoutingModule,
        NgSelectModule,
        FormsModule,
        NgbDropdownModule,
        NgbModalModule,
        UIModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        DashboardsModule,
        HttpClientModule,
        FullCalendarModule,
        NgbNavModule,
        NgbTooltipModule,
        SimplebarAngularModule,
        NgxPaginationModule,
        NgxDropzoneModule,
    ],
})
export class SmsModule {}
