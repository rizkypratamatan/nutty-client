import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { UserService } from 'src/app/services/user/user.service';

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
        Object.keys(this.fields).forEach((key) =>
            this.fields[key] === '' ? delete this.fields[key] : key
        );
        this.filter = Object.assign({}, this.fields);
    }

    constructor(
        private service: UserService,
        private userGroupService: UserGroupService,
        private userRoleService: UserRoleService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.service.getAllUser().subscribe((response) => {
            this.allUsers = response['dataUser'];
            this.allType = this.typeFilter;
            this.allStatus = this.statusFilter;
            this.totalUser = this.allUsers.length;
            // console.log(this.totalUser);
        });

        this.userGroupService.getAllGroup().subscribe((response) => {
            this.allGroup = response['dataUser'];
        });

        this.userRoleService.getAllRole().subscribe((response) => {
            this.allRole = response['dataUser'];
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
        console.log(currentUrl);

        let data = {
            platform: 'Website',
            id: id,
        };

        if (confirm('Are you sure to delete user: ' + name)) {
            // console.log("Implement delete functionality here");
            this.service.deleteUser(data).subscribe((response) => {
                // if (response.result === true) {
                    // this.router.navigate(['/user']);
                    this.router
                        .navigateByUrl('/', { skipLocationChange: true })
                        .then(() => this.router.navigate([currentUrl]));
                // }
            });
        }
    }
}
