import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { HelperService } from 'src/app/services/helper.service';
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
        filter_date: '',
    };

    filter = {};
    p: number = 1;
    totalUser: number;
    resultStatus = 0;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        this.getPage(1);
    }

    constructor(
        private service: UserReportService,
        private router: Router,
        private helper: HelperService
    ) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    detail(id) {
        this.router.navigate(['/report/user/' + id]);
    }

    result(id) {
        this.router.navigate(['/worksheet/result?id=' + id]);
    }

    getPage(page: number) {
        this.loading = true;
        this.service
            .getAllUserReport(this.fields, page)
            .subscribe((response) => {
                // if(response.status == true){
                //     this.allUsers = response['data'];
                //     console.log(this.allUsers);
                //     this.nucode = response['userGroups'][0]['nucode'];
                //     this.totalUser = response['total_data'];
                //     this.p = page;
                // }
                this.allUsers = response['data'];
                console.log(this.allUsers);
                this.nucode = response['userGroups'][0]['nucode'];
                this.totalUser = response['recordsTotal'];
                this.p = page;
                this.loading = false;
                
            });
    }

    initializeStatus(status, name: string) {
        this.resultStatus = 0;

        status.forEach((element) => {
            this.initializeTableStatus(name, element.names, element.totals);
        });

        return this.resultStatus;
    }

    initializeTableStatus(name, names, totals) {
        let index = names.indexOf(name);

        if (index >= 0) {
            this.resultStatus += totals[index];
        }

        return this.resultStatus;
    }

    datePickerOption: FlatpickrOptions = {
        dateFormat: 'Y/m/d',
        mode: 'range',
        onChange: (selectedDates: any) => {
            if (selectedDates.length > 0) {
                if (typeof selectedDates[1] != 'undefined') {
                    this.fields.filter_date =
                        this.helper.initializeDate(selectedDates[0]) +
                        ' to ' +
                        this.helper.initializeDate(selectedDates[1]);
                } else {
                    this.fields.filter_date = this.helper.initializeDate(
                        selectedDates[0]
                    );
                }
            } else {
                this.fields.filter_date = '';
            }
            this.updateFilters();
        },
    };
}
