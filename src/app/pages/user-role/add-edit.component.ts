import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { AuthService } from 'src/app/services/global/auth.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditRoleComponent implements OnInit {
    id: string;
    isAddMode: boolean;
    status = ['Active', 'Inactive'];
    isValid: boolean =  true;
    errorMsg: any[] = [];
    loadingIndicator : boolean = false;

    data: any;
    privilege = {
        database: '0000',
        report: '0000',
        setting: '0000',
        settingApi: '0000',
        user: '0000',
        userGroup: '0000',
        userRole: '0000',
        website: '0000',
        worksheet: '0000',
        tools: '0000',
        worksheetCrm: '0000'
    };

    fields = {
        platform: 'Website',
        description: '',
        name: '',
        nucode: 'system',
        privilege: this.privilege,
        status: '',
    };

    auth: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userRoleService: UserRoleService,
        private authService: AuthService
    ) {
        this.auth = this.authService.Auth();
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.userRoleService.getRoleById(this.id).subscribe((response) => {
                this.privilege = response.data.privilege;

                this.fields = {
                    platform: 'Website',
                    description: response.data.description,
                    name: response.data.name,
                    nucode: response.data.nucode,
                    privilege: this.privilege,
                    status: response.data.status,
                };
            });
        }else{
            this.fields.nucode = this.auth.nucode;
        }
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if(this.isValid){
            this.loadingIndicator = true;
            if (this.isAddMode) {
                this.create();
            } else {
                this.update();
            }
        }
    }

    validateInput(){
        this.isValid = true;
        if(!this.fields.description){
            this.isValid = false;
            this.errorMsg.push("Description is Required");
        }
        if(!this.fields.name){
            this.isValid = false;
            this.errorMsg.push("Name is Required");
        }
        if(!this.fields.status){
            this.isValid = false;
            this.errorMsg.push("Status is Required");
        }
        if(!this.fields.nucode){
            this.isValid = false;
            this.errorMsg.push("Nucode is Required");
        }
    }

    private create() {
        this.userRoleService.addRole(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Success!',
                    text: 'Add Role Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/user/role']);
            }
        });
    }

    private update() {
        let id = this.id;
        this.userRoleService.updateRole(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/user/role']);
            }
        });
    }

    updatePrivilege(key: any, index: any, value: any) {
        let priv = this.privilege[key].split('');
        priv[index] = value;
        this.privilege[key] = priv.join('');
        this.fields.privilege = this.privilege
    }
}
