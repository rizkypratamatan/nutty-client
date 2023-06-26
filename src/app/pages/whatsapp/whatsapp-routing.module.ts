import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { WASentComponent } from './sent/sent.component';
import { WABulkComponent } from './bulk/bulk.component';

const routes: Routes = [
    {
        path: 'sent',
        component: WASentComponent,
    },
    {
        path: 'bulk',
        component: WABulkComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class WhatsappRoutingModule {}
