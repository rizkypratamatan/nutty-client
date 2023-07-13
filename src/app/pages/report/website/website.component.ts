import { Component, OnInit } from '@angular/core';
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
        date: '',
    };

    filter = {};
    p: number = 1;
    totalWebsite: number;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        this.getPage(1);
    }
    constructor(private service: WebsiteReportService) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.service
            .getAllWebsiteReport(this.fields, page)
            .subscribe((response) => {
                // console.log(response['data'][0]['user']);return;
                this.allWebsites = response['data'];
                this.nucode = response['userGroups'][0]['nucode'];
                this.totalWebsite = response['total_data'];
                this.p = page;
                this.loading = false;
            });
    }
}
