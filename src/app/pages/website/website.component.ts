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
        Object.keys(this.fields).forEach((key) =>
            this.fields[key] === '' ? delete this.fields[key] : key
        );
        this.filter = Object.assign({}, this.fields);
    }

    constructor(private service: WebsiteService, private router: Router) {}

    ngOnInit(): void {
        this.service.getAllWebsite().subscribe((response) => {
            this.allWebsites = response['data'];
            this.allStatus = this.statusFilter;
            this.totalWebsite = this.allWebsites.length;
            // console.log(response);
        });
    }

    create() {
        this.router.navigate(['/website/add-edit']);
    }
}
