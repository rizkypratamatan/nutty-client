import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-user-group',
    templateUrl: './user-group.component.html',
    styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent implements OnInit {
    allGroups: any[] = [];
    allStatus: any[] = [];
    allWebsite: any[] = [];
    loading: boolean = false;

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
       this.getPage(1)
    }

    constructor(
        private service: UserGroupService,
        private websiteService: WebsiteService,
        private router: Router,
        private helper: HelperService
        ) {}

    ngOnInit(): void {
        
        this.getPage(1)

        this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
            this.allWebsite = response['data'];
        });
    }
    getPage(page: number) {
        this.loading = true;
        this.service.getAllGroup(this.fields, page).subscribe((response) => {
            this.allGroups = response['dataUser'];
            this.allStatus = this.statusFilter;
            this.totalGroup = response['totalData'];
            this.p = page
            this.loading = false
        });
    }

    create() {
        this.router.navigate(['/user/group/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/user/group/add-edit/' + id]);
    }

    delete(id, name) {
        const currentUrl = this.router.url;
        console.log(currentUrl);

        let data = {
            platform: 'Website',
            id: id,
        };

        if (confirm('Are you sure to delete user: ' + name)) {
            this.service.deleteGroup(data).subscribe((response) => {
                if (response.result === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: response.response,
                        icon: 'success',
                        confirmButtonText: 'Close'
                    });
                    this.getPage(1)
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: response.response,
                        icon: 'error',
                        confirmButtonText: 'Close'
                    });
                }
            });
        }
    }

    initializeTimestamp(timestamp){
        return this.helper.initializeTimestamp(timestamp);
    }
}
