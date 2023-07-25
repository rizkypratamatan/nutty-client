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
import { FlatpickrModule } from 'angularx-flatpickr';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

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
import { UserRoleComponent } from './user-role/user-role.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { WebsiteComponent } from './website/website.component';
import { LicenseComponent } from './license/license.component';
import { ReportComponent } from './report/report.component';
import { ApiComponent } from './api/api.component';
import { AddEditApiComponent } from './api/add-edit.component';
import { WorksheetComponent } from './worksheet/worksheet.component';
import { WorksheetResultComponent } from './worksheet-result/worksheet-result.component';
import { DatabaseComponent } from './database/database.component';
import { DatabaseImportComponent } from './database-import/database-import.component';
import { DatabaseHistoryComponent } from './database-history/database-history.component';
import { UserTableFilterPipe } from './user/table-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditComponent } from './user/add-edit.component';
import { AddEditRoleComponent } from './user-role/add-edit.component';
import { AddEditGroupComponent } from './user-group/add-edit.component';
import { AddEditWebsiteComponent } from './website/add-edit.component';
import { AddEditDatabaseComponent } from './database/add-edit.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MessageTemplateComponent } from './message-template/message-template.component';
import { AddEditMessageTemplateComponent } from './message-template/add-edit.component';
import { WorksheetCrmComponent } from './worksheet-crm/worksheet-crm.component';
import { AddEditLicenseComponent } from './license/add-edit.component';

import { WorksheetCallComponent } from './worksheet-crm/worksheet-call/worksheet-call.component';
import { SettingsComponent } from './settings/settings.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

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
        UserRoleComponent,
        UserGroupComponent,
        WebsiteComponent,
        LicenseComponent,
        ReportComponent,
        ApiComponent,
        AddEditApiComponent,
        WorksheetComponent,
        WorksheetResultComponent,
        WorksheetCrmComponent,
        DatabaseComponent,
        DatabaseImportComponent,
        DatabaseHistoryComponent,
        UserTableFilterPipe,
        AddEditComponent,
        AddEditRoleComponent,
        AddEditGroupComponent,
        AddEditWebsiteComponent,
        AddEditDatabaseComponent,
        UserTableFilterPipe,
        MessageTemplateComponent,
        AddEditMessageTemplateComponent,
        WorksheetCrmComponent,
        AddEditLicenseComponent,
        WorksheetCallComponent,
        SettingsComponent,
    ],
    imports: [
        Ng2FlatpickrModule,
        FlatpickrModule,
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
        NgxPaginationModule,
        NgxDropzoneModule,
        CKEditorModule,
    ],
})
export class PagesModule {}
