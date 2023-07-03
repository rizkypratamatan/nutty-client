import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/services/api/api.service';

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

    updateFilters() {
        this.getPage(1);
    }

    constructor(private service: ApiService, private router: Router) {}

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
}
