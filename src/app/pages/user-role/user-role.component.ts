import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { HelperService } from 'src/app/services/helper.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/global/auth.service';

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
    auth: any;

    

    constructor(private service: UserRoleService, 
                private router: Router,
                private helper: HelperService,
                private authService: AuthService
        ) {
            this.auth = this.authService.Auth();
        }

    ngOnInit(): void {
       this.getPage(1);
    }

    updateFilters() {
        this.getPage(1)
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

    delete(id, name) {
        const currentUrl = this.router.url;

        let data = {
            platform: 'Website',
            id: id,
        };

        if (confirm('Are you sure to delete user: ' + name)) {
            this.service.deleteRole(data).subscribe((response) => {
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
