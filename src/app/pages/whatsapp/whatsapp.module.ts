import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { WASentComponent } from './sent/sent.component';
import { WABulkComponent } from './bulk/bulk.component';
import { WAHistoryComponent } from './history/history.component';
import { WhatsappRoutingModule } from './whatsapp-routing.module';

@NgModule({
    declarations: [WASentComponent, WABulkComponent, WAHistoryComponent],
    imports: [
        CommonModule,
        WhatsappRoutingModule,
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
export class WhatsappModule {}
