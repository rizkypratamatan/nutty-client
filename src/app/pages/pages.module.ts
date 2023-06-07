import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SimplebarAngularModule } from 'simplebar-angular';

import {
    NgbNavModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';

import { DashboardsModule } from './dashboards/dashboards.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoaderService } from '../core/services/loader.service';

import { CalendarComponent } from './calendar/calendar.component';
import { ChatComponent } from './chat/chat.component';
import { UserComponent } from './user/user.component';
import { UserEntryComponent } from './user-entry/user-entry.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleEntryComponent } from './user-role-entry/user-role-entry.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { UserGroupEntryComponent } from './user-group-entry/user-group-entry.component';
import { WebsiteComponent } from './website/website.component';
import { WebsiteEntryComponent } from './website-entry/website-entry.component';
import { LicenseComponent } from './license/license.component';
import { ReportComponent } from './report/report.component';
import { ApiComponent } from './api/api.component';
import { WorksheetComponent } from './worksheet/worksheet.component';
import { WorksheetResultComponent } from './worksheet-result/worksheet-result.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseImportComponent } from './database-import/database-import.component';
import { DatabaseHistoryComponent } from './database-history/database-history.component';
import { UserTableFilterPipe } from './user/table-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditComponent } from './user/add-edit.component';
import { AddEditRoleComponent } from './user-role/add-edit.component';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    interactionPlugin,
    bootstrapPlugin,
    timeGridPlugin,
    listPlugin,
]);

@NgModule({
    declarations: [
        CalendarComponent,
        ChatComponent,
        UserComponent,
        UserEntryComponent,
        UserRoleComponent,
        UserRoleEntryComponent,
        UserGroupComponent,
        UserGroupEntryComponent,
        WebsiteComponent,
        WebsiteEntryComponent,
        LicenseComponent,
        ReportComponent,
        ApiComponent,
        WorksheetComponent,
        WorksheetResultComponent,
        DatabaseComponent,
        DatabaseImportComponent,
        DatabaseHistoryComponent,
        UserTableFilterPipe,
        AddEditComponent,
        AddEditRoleComponent
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        FormsModule,
        NgbDropdownModule,
        NgbModalModule,
        UIModule,
        PagesRoutingModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        DashboardsModule,
        HttpClientModule,
        FullCalendarModule,
        NgbNavModule,
        NgbTooltipModule,
        SimplebarAngularModule,
        NgxPaginationModule
    ],
})
export class PagesModule {}
