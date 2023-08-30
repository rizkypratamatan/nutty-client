import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/global/auth.service';

@Component({
    selector: 'app-api',
    templateUrl: './api.component.html',
    styleUrls: ['./api.component.scss'],
})
export class ApiComponent implements OnInit {
    allWebsites: any[] = [];
    allStatus: any[] = [];
    limit: number = 10;
    offset: number = 0;
    page: number = 1;
    loading: boolean = false;

    fields = {
        name: '',
        nucode: '',
    };

    p: number = 1;
    totalWebsite: number;

    statusFilter = ['Active', 'Inactive'];

    auth: any;

    updateFilters() {
        this.getPage(1);
    }

    constructor(private service: ApiService,
                private router: Router, 
                private authService: AuthService,
                private helper: HelperService) 
    {
        this.auth = this.authService.Auth();
    }

    ngOnInit(): void {
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAll(this.fields, page).subscribe((response) => {
            this.allWebsites = response['data'];
            this.totalWebsite = response['total_data'];
            this.p = page;
            this.loading = false;
        });
    }

    edit(id) {
        this.router.navigate(['/api/add-edit/' + id]);
    }

    initializeDate(timestamp){
        return this.helper.initializeDate(timestamp);
    }
}
