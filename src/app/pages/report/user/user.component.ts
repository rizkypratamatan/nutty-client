import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserReportService } from 'src/app/services/report/user-report.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    allUsers: any[] = [];
    nucode: any = '';
    loading: boolean = false;

    fields = {
        username: '',
        name: '',
        nucode: '',
        status: '',
        date: '',
    };

    filter = {};
    p: number = 1;
    totalUser: number;
    resultStatus = 0;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        this.getPage(1);
    }

    constructor(private service: UserReportService, private router: Router) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    edit(id) {
        this.router.navigate(['/report/user/' + id]);
    }

    getPage(page: number) {
        this.loading = true;
        this.service
            .getAllUserReport(this.fields, page)
            .subscribe((response) => {
                // console.log(response);
                // return;
                this.allUsers = response['data'];
                this.nucode = response['userGroups'][0]['nucode'];
                this.totalUser = response['total_data'];
                this.p = page;
                this.loading = false;
            });
    }

    initializeTableStatus = function (name, names, total, totals) {
        let index = names.indexOf(name);

        if (index >= 0) {
            total += totals[index];
        }

        return total;
    };
}
