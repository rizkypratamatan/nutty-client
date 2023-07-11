import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { UserService } from 'src/app/services/user/user.service';
import { HelperService } from 'src/app/services/helper.service';
import { AuthService } from 'src/app/services/global/auth.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    allUsers: any[] = [];
    allType: any[] = [];
    allGroup: any[] = [];
    allRole: any[] = [];
    allStatus: any[] = [];
    loading: boolean = false;
    auth: any;

    fields = {
        username: '',
        name: '',
        nucode: '',
        type: '',
        group: '',
        role: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalUser: number;

    typeFilter = ['Administrator', 'CRM', 'Telemarketer'];
    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);
        this.getPage(1)
    }

    constructor(
        private service: UserService,
        private userGroupService: UserGroupService,
        private userRoleService: UserRoleService,
        private router: Router,
        private helper: HelperService,
        private authservice: AuthService
    ) {}

    ngOnInit(): void {
        this.getPage(1)
        this.userGroupService.getAllGroup({}, 1).subscribe((response) => {
            this.allGroup = response['dataUser'];
        });
        this.userRoleService.getAllRole({}, 1).subscribe((response) => {
            this.allRole = response['data'];
        });
    }

    getPage(page: number) {
        this.auth = this.authservice.Auth()
        this.loading = true;
        this.service.getAllUser(this.fields, page).subscribe((response) => {
            this.allUsers = response['dataUser'];
            this.allType = this.typeFilter;
            this.p = page;
            this.allStatus = this.statusFilter;
            this.totalUser = response['total_data'];
            this.loading = false;
        });
    }

    create() {
        this.router.navigate(['/user/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/user/add-edit/' + id]);
    }

    delete(id, name) {
        const currentUrl = this.router.url;
        let data = {
            platform: 'Website',
            id: id,
        };

        if (confirm('Are you sure to delete user: ' + name)) {
            this.service.deleteUser(data).subscribe((response) => {
                if (response.result === true) {
                    this.router.navigate(['/user']);
                    // this.router
                    //     .navigateByUrl('/', { skipLocationChange: true })
                    //     .then(() => this.router.navigate([currentUrl]));
                }
            });
        }
    }

    initializeTimestamp(timestamp){
        return this.helper.initializeTimestamp(timestamp);
    }
}
