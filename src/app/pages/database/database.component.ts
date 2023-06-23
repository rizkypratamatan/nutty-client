import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
    allData: any[] = [];
    loading: boolean = false;
    allWebsite: any[] = [];

    filter = {
        'website' : '',
        'name'  : '',
        'phone' : ''        
    };

    p: number = 1;
    totalData: number;

    updateFilters() {
        this.getPage(1);
    }

    constructor(
        private service: DatabaseService, 
        private router: Router,
        private userService: UserService,
        private websiteService: WebsiteService
    ) {}

    ngOnInit(): void {
        let auth = this.userService.Auth();

        if(auth['role'].name.toLowerCase() == 'system'){
            this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
                this.allWebsite = response['data'];
                this.filter.website = response['data'][0]['_id'];
                this.getPage(1);
            });
            
        }else{
            this.filter.website = auth['group']._id;
            this.allWebsite = [
                    auth['website']
                ];
            this.getPage(1);
        }
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllDatabase(this.filter, page).subscribe((response) => {
            this.allData = response['data'];
            this.p = page;
            this.totalData = response['total_data'];
            this.loading = false;
        });
    }

    edit(id) {
        this.router.navigate(['/database/add-edit/' + id]);
    }
}
