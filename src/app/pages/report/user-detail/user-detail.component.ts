import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { HelperService } from 'src/app/services/helper.service';
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
        this.getPage(this.fields);
    }

    constructor(
        private service: UserReportService,
        private route: ActivatedRoute,
        private helper: HelperService
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

    getPage(request: {}) {
        this.loading = true;
        this.service
            .getUserById(request)
            .subscribe((response) => {
                // console.log(response['data'][0]['user']);return;
                this.allUsers = response['data'];
                this.nucode = response['userGroups'] ? response['userGroups'][0]['nucode'] : '';
                this.totalUser = response['total_data'];
                // this.p = page;
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
