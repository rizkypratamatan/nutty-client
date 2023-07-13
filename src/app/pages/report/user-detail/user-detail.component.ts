import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserReportService } from 'src/app/services/report/user-report.service';

@Component({
    selector: 'app-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
    allUsers: any[] = [];
    nucode: any = '';
    loading: boolean = false;

    fields = {
        username: '',
        name: '',
        nucode: '',
        status: '',
        filter_date: '',
    };

    filter = {};
    p: number = 1;
    totalUser: number;
    resultStatus = 0;
    id: string;
    userName: string;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        // this.getPage(1);
    }

    constructor(
        private service: UserReportService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.fields['id'] = this.id;

        this.service.getUserById(this.fields).subscribe((response) => {
            // console.log(response);return;
            this.allUsers = response['data'];
            this.userName = response['data'][0]['user']['name'];
            // this.nucode = response['userGroups'][0]['nucode'];
            this.totalUser = response['total_data'];
            // this.p = page;
            this.loading = false;
        });
    }

    // getPage(id: string) {
    //     this.loading = true;
    //     this.service
    //         .getUserById(id)
    //         .subscribe((response) => {
    //             // console.log(response['data'][0]['user']);return;
    //             this.allUsers = response['data'];
    //             this.nucode = response['userGroups'][0]['nucode'];
    //             this.totalUser = response['total_data'];
    //             // this.p = page;
    //             this.loading = false;
    //         });
    // }

    initializeTableStatus = function (name, names, total, totals) {
        let index = names.indexOf(name);

        if (index >= 0) {
            total += totals[index];
        }

        return total;
    };
}
