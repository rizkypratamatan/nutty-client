import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
    selector: 'app-website',
    templateUrl: './website.component.html',
    styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
    allWebsites: any[] = [];
    allStatus: any[] = [];
    limit: number = 10;
    offset: number = 0;
    page: number = 1;
    loading: boolean = false;

    fields = {
        name: '',
        nucode: '',
        type: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalWebsite: number;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);
        this.getPage(1);
    }

    constructor(private service: WebsiteService, private router: Router) {}

    ngOnInit(): void {
        // this.service.getAllWebsite(this.fields).subscribe((response) => {
        //     console.log(response)
        //     this.allWebsites = response['data'];
        //     this.totalWebsite = response['total_data'];
        // });
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllWebsite(this.fields, page).subscribe((response) => {
            this.allWebsites = response['data'];
            this.totalWebsite = response['total_data'];
            this.p = page;
            this.loading = false;
        });
    }

    create() {
        this.router.navigate(['/website/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/website/add-edit/' + id]);
    }
}
