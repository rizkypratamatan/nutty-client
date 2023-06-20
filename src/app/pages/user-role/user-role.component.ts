import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/user/user-role.service';

@Component({
    selector: 'app-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit {
    allRoles: any[] = [];
    loading: boolean= false;

    fields = {
        name: '',
        nucode: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalRole: number;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);
        this.getPage(1)
    }

    constructor(private service: UserRoleService, private router: Router) {}

    ngOnInit(): void {
       this.getPage(1);
    }
    getPage(page: number) {
        this.loading = true;
        this.service.getAllRole(this.fields, page).subscribe((response) => {
            this.allRoles = response['data'];
            this.totalRole = response['total_data'];  
            this.p = page;
            this.loading = false
        });
    }

    create() {
        this.router.navigate(['/user/role/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/user/role/add-edit/' + id]);
    }
}
