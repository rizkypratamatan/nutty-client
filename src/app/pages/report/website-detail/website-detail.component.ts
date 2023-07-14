import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { HelperService } from 'src/app/services/helper.service';
import { WebsiteReportService } from 'src/app/services/report/website-report.service';

@Component({
    selector: 'app-website-detail',
    templateUrl: './website-detail.component.html',
    styleUrls: ['./website-detail.component.scss'],
})
export class WebsiteDetailComponent implements OnInit {
    allWebsites: any[] = [];
    nucode: any = '';
    loading: boolean = false;

    fields = {
        website: '',
        nucode: '',
        status: '',
        filter_date: '',
    };

    filter = {};
    p: number = 1;
    totalWebsite: number;
    resultStatus = 0;
    id: string;
    websiteName: string;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        this.getPage(this.fields);
    }

    constructor(
        private service: WebsiteReportService,
        private route: ActivatedRoute,
        private helper: HelperService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.fields['id'] = this.id;

        this.service.getWebsiteById(this.fields).subscribe((response) => {
            // console.log(response);return;
            this.allWebsites = response['data'];
            this.websiteName = response['data'][0]['website']['name'];
            // this.nucode = response['userGroups'][0]['nucode'];
            this.totalWebsite = response['total_data'];
            // this.p = page;
            this.loading = false;
        });
    }

    getPage(request: {}) {
        this.loading = true;
        this.service.getWebsiteById(request).subscribe((response) => {
            // console.log(response['data'][0]['user']);return;
            this.allWebsites = response['data'];
            this.totalWebsite = response['total_data'];
            // this.p = page;
            this.loading = false;
        });
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

    initializeTableStatus = function (name, names, total, totals) {
        let index = names.indexOf(name);

        if (index >= 0) {
            total += totals[index];
        }

        return total;
    };
}
