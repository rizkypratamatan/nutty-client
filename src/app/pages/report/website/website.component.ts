import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { HelperService } from 'src/app/services/helper.service';
import { WebsiteReportService } from 'src/app/services/report/website-report.service';

@Component({
    selector: 'app-website',
    templateUrl: './website.component.html',
    styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
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

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        this.getPage(1);
    }
    
    constructor(
        private service: WebsiteReportService,
        private helper: HelperService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    edit(id) {
        this.router.navigate(['/report/website/' + id]);
    }

    getPage(page: number) {
        this.loading = true;
        this.service
            .getAllWebsiteReport(this.fields, page)
            .subscribe((response) => {
                // console.log(response);return;
                this.allWebsites = response['data'];
                // this.nucode = response['userGroups'][0]['nucode'];
                this.totalWebsite = response['total_data'];
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
