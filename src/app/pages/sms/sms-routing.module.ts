import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SMSSentComponent } from './sent/sent.component';
import { SMSBulkComponent } from './bulk/bulk.component';

const routes: Routes = [
    {
        path: 'sent',
        component: SMSSentComponent,
    },
    {
        path: 'bulk',
        component: SMSBulkComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SmsRoutingModule {}
