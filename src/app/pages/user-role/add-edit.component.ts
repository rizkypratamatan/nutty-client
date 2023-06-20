import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from 'src/app/services/user/user-role.service';

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
    privileges = {
        database: '0000',
        report: '0000',
        setting: '0000',
        settingApi: '0000',
        user: '0000',
        userGroup: '0000',
        userRole: '0000',
        website: '0000',
        worksheet: '0000',
        whatsapp: '0000',
        sms: '0000',
        email: '0000',
    };

    fields = {
        platform: 'Website',
        description: '',
        name: '',
        nucode: '',
        privileges: this.privileges,
        status: '',
    };

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userRoleService: UserRoleService
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if (!this.isAddMode) {
            this.userRoleService.getRoleById(this.id).subscribe((response) => {
                this.privileges = response.data.privileges;

                this.fields = {
                    platform: 'Website',
                    description: response.data.description,
                    name: response.data.name,
                    nucode: response.data.nucode,
                    privileges: this.privileges,
                    status: response.data.status,
                };
            });
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
                this.router.navigate(['/user/role']);
            }
        });
    }

    private update() {
        let id = this.id;
        this.userRoleService.updateRole(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.loadingIndicator = false;
                this.router.navigate(['/user/role']);
            }
        });
    }

    updatePrivilege(key: any, index: any, value: any) {
        let priv = this.privileges[key].split('');
        priv[index] = value;
        this.privileges[key] = priv.join('');
        this.fields.privileges = this.privileges
    }
}
