import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SentComponent } from './sent/sent.component';
import { BulkComponent } from './bulk/bulk.component';

const routes: Routes = [
    {
        path: 'sent',
        component: SentComponent,
    },
    {
        path: 'bulk',
        component: BulkComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmailRoutingModule {}
