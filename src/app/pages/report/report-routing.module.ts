import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { WebsiteComponent } from './website/website.component';

const routes: Routes = [
    {
        path: 'user',
        component: UserComponent,
    },
    {
        path: 'website',
        component: WebsiteComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportRoutingModule {}
