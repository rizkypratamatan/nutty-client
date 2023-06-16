import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';
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
import { AddEditComponent } from './user/add-edit.component';
import { AddEditRoleComponent } from './user-role/add-edit.component';
import { AddEditGroupComponent } from './user-group/add-edit.component';
import { AddEditWebsiteComponent } from './website/add-edit.component';
import { AddEditDatabaseComponent } from './database/add-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'ecommerce', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
  { path: 'email', loadChildren: () => import('./email/email.module').then(m => m.EmailModule) },
  { path: 'invoices', loadChildren: () => import('./invoices/invoices.module').then(m => m.InvoicesModule) },
  { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },  
  { path: 'pages', loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule) },
  { path: 'ui', loadChildren: () => import('./ui/ui.module').then(m => m.UiModule) },  
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'charts', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
  { path: 'user', component: UserComponent },
  { path: 'user/add-edit', component: AddEditComponent },
  { path: 'user/add-edit/:id', component: AddEditComponent },
  { path: 'user/entry', component: UserEntryComponent },
  { path: 'user/role', component: UserRoleComponent },
  { path: 'user/role/add-edit', component: AddEditRoleComponent },
  { path: 'user/role/add-edit/:id', component: AddEditRoleComponent },
  { path: 'user/role/entry', component: UserRoleEntryComponent },
  { path: 'user/group', component: UserGroupComponent },
  { path: 'user/group/add-edit', component: AddEditGroupComponent },
  { path: 'user/group/add-edit/:id', component: AddEditGroupComponent },
  { path: 'website', component: WebsiteComponent },
  { path: 'website/add-edit', component: AddEditWebsiteComponent },
  { path: 'website/add-edit/:id', component: AddEditWebsiteComponent },
  { path: 'worksheet', component: WorksheetComponent },
  { path: 'worksheet/result', component: WorksheetResultComponent },
  { path: 'database', component: DatabaseComponent },
  { path: 'database/add-edit', component: AddEditDatabaseComponent },
  { path: 'database/add-edit/:id', component: AddEditDatabaseComponent },
  { path: 'database/import', component: DatabaseImportComponent },
  { path: 'database/history', component: DatabaseHistoryComponent },
  { path: 'report', component: ReportComponent },
  { path: 'api', component: ApiComponent },
  { path: 'license', component: LicenseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
