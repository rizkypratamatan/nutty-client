import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
    selector: 'app-user-group',
    templateUrl: './user-group.component.html',
    styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent implements OnInit {
    allGroups: any[] = [];
    allStatus: any[] = [];
    allWebsite: any[] = [];

    fields = {
        name: '',
        website: '',
        nucode: '',
        type: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalGroup: any;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);
        this.service.getAllGroup(this.fields).subscribe((response) => {
            this.allGroups = response['dataUser'];
        });
    }

    constructor(
        private service: UserGroupService,
        private websiteService: WebsiteService,
        private router: Router,
        ) {}

    ngOnInit(): void {
        this.service.getAllGroup(this.fields).subscribe((response) => {
            
            this.allGroups = response['dataUser'];
            console.log(this.allGroups)
            this.allStatus = this.statusFilter;
            this.totalGroup = response['totalData'];
        });

        this.websiteService.getAllWebsite({}).subscribe((response) => {
            this.allWebsite = response['data'];
        });
    }

    create() {
        this.router.navigate(['/user/group/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/user/group/add-edit/' + id]);
    }
}
