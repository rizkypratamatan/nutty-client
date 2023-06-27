import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { InboxComponent } from './inbox/inbox.component';
import { ReadEmailComponent } from './read-email/read-email.component';

const routes: Routes = [
    {
        path: 'inbox',
        component: InboxComponent,
    },
    {
        path: 'read-email',
        component: ReadEmailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmailRoutingModule {}
