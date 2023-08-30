import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { HelperService } from 'src/app/services/helper.service';
import { WebsiteReportService } from 'src/app/services/report/website-report.service';
import { AuthService } from 'src/app/services/global/auth.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
    selector: 'app-website',
    templateUrl: './website.component.html',
    styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
    allWebsites: any[] = [];
    nucode: any = '';
    loading: boolean = false;
    allWebsite: any[] = [];

    fields = {
        website: '',
        nucode: '',
        status: '',
        filter_date: '',
    };

    p: number = 1;
    totalWebsite: number;
    resultStatus = 0;

    updateFilters() {
        this.getPage(1);
    }
    
    constructor(
        private service: WebsiteReportService,
        private helper: HelperService,
        private router: Router,
        private authService: AuthService,
        private websiteService: WebsiteService
    ) {}

    ngOnInit(): void {
        let auth = this.authService.Auth();
        if(auth['role'].name.toLowerCase() == 'system'){
            this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
                this.allWebsite = response['data'];
                this.fields.website = response['data'][0]['_id'];
                this.getPage(1);
            });
            
        }else{
            let arrWeb = [];
            auth['website']['ids'].forEach(function(value, index){
                let data = {
                    "_id" : auth['website']['ids'][index],
                    "name" : auth['website']['names'][index],
                }
                arrWeb.push(data);
            });

            this.allWebsite = arrWeb;
            this.getPage(1);
        }
    }

    edit(id) {
        this.router.navigate(['/report/website/' + id]);
    }

    getPage(page: number) {
        this.loading = true;
        this.service
            .getAllWebsiteReport(this.fields, page)
            .subscribe((response) => {
                // if(response.status == true){
                //     // console.log(response);return;
                //     this.allWebsites = response['data'];
                //     // this.nucode = response['userGroups'][0]['nucode'];
                //     this.totalWebsite = response['recordsTotal'];
                //     this.p = page;
                // }
                this.allWebsites = response['data'];
                this.totalWebsite = response['recordsTotal'];
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
