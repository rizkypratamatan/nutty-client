import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { WebsiteComponent } from './website/website.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { WebsiteDetailComponent } from './website-detail/website-detail.component';

const routes: Routes = [
    {
        path: 'user',
        component: UserComponent,
    },
    {
        path: 'website',
        component: WebsiteComponent,
    },
    {
        path: 'user/:id',
        component: UserDetailComponent,
    },
    {
        path: 'website/:id',
        component: WebsiteDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportRoutingModule {}
