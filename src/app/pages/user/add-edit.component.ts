import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'src/app/services/global/auth.service';

@Component({
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
    allRoles: any[] = [];
    allGroup: any[] = [];
    role: any = '';
    group: any = '';
    filteredRole: any;
    filteredGroup: any;
    confirm_password: string = '';
    status = ['Active', 'Inactive'];
    auth: any;

    isValid: boolean =  true;
    errorMsg: any[] = [];
    loadingIndicator : boolean = false;

    id: string;
    isAddMode: boolean;

    fields = {
        username: '',
        name: '',
        password: '',
        nucode: 'system',
        type: '',
        role: {},
        group: {},
        status: '',
        platform: 'Website',
        gender: '',
        contact: {
            email: '',
            fax: '',
            line: '',
            michat: '',
            phone: '',
            wechat: '',
            whatsapp: '',
            telegram: '',
        },
        country: '',
        city: '',
        street: '',
        zip: '',
    };

    constructor(
        private userService: UserService,
        private userRoleService: UserRoleService,
        private userGroupService: UserGroupService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.auth = this.authService.Auth();
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.userRoleService.getAllRole({}, 1).subscribe((response) => {
            this.allRoles = response['data'];
        });

        this.userGroupService.getAllGroup({}, 1).subscribe((response) => {
            this.allGroup = response['dataUser'];
        });

        if (!this.isAddMode) {
            this.userService.getUserById(this.id).subscribe((response) => {
                this.role = response.user.role._id.$oid;
                this.group = response.user.group._id.$oid
                this.confirm_password = response.user.password.main

                this.fields = {
                    username: response.user.username,
                    name: response.user.name,
                    password: response.user.password.main,
                    nucode: response.user.nucode,
                    type: response.user.type,
                    role: {
                        "_id": response.user.role._id.$oid,
                        "name": response.user.role.name
                    },
                    group: {
                        "_id": response.user.group._id.$oid,
                        "name": response.user.group.name
                    },
                    status: response.user.status,
                    platform: 'Website',
                    gender: response.user.gender
                        ? response.user.gender
                        : '',
                    contact: {
                        email: response.user.email
                            ? response.user.email
                            : '',
                        fax: response.user.fax ? response.user.fax : '',
                        line: response.user.line
                            ? response.user.line
                            : '',
                        michat: response.user.michat
                            ? response.user.michat
                            : '',
                        phone: response.user.phone
                            ? response.user.phone
                            : '',
                        wechat: response.user.wechat
                            ? response.user.wechat
                            : '',
                        whatsapp: response.user.whatsapp
                            ? response.user.whatsapp
                            : '',
                        telegram: response.user.telegram
                            ? response.user.telegram
                            : '',
                    },
                    country: response.user.country
                        ? response.user.country
                        : '',
                    city: response.user.city ? response.user.city : '',
                    street: response.user.street
                        ? response.user.street
                        : '',
                    zip: response.user.zip ? response.user.zip : '',
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
        if(!this.fields.username){
            this.isValid = false;
            this.errorMsg.push("Username is Required");
        }
        if(!this.fields.name){
            this.isValid = false;
            this.errorMsg.push("Name is Required");
        }
        if(!this.fields.password){
            this.isValid = false;
            this.errorMsg.push("Password is Required");
        }
        if(this.fields.password != this.confirm_password){
            this.isValid = false;
            this.errorMsg.push("Password doesn't match");
        }

        if(this.fields.password.length < 8){
            this.isValid = false;
            this.errorMsg.push("Min Password length 8 char");
        }
        if(!this.fields.nucode){
            this.isValid = false;
            this.errorMsg.push("Nucode is Required");
        }
        if(!this.fields.type){
            this.isValid = false;
            this.errorMsg.push("Type is Required");
        }
        if(Object.keys(this.fields.role).length == 0){
            this.isValid = false;
            this.errorMsg.push("Role is Required");
        }
        if(Object.keys(this.fields.group).length == 0){
            this.isValid = false;
            this.errorMsg.push("Group is Required");
        }
        if(!this.fields.status){
            this.isValid = false;
            this.errorMsg.push("Status is Required");
        }
        
    }

    private create() {
        this.userService.addUser(this.fields).subscribe((response) => {
            if (response.result === true) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Add User Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
                this.router.navigate(['/user']);
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: response.response,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
            this.loadingIndicator = false;
        });
    }

    private update() {
        let id = this.id;

        this.userService.updateUser(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Update Success',
                    icon: 'success',
                    confirmButtonText: 'Close'
                });
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: response.response,
                    icon: 'error',
                    confirmButtonText: 'Close'
                });
            }
            this.loadingIndicator = false;
        });
    }

    onOptionsSelectedRole() {
        if (this.role !== null && this.role !== undefined) {
            this.filteredRole = this.allRoles.filter((t) => t._id == this.role);
            if (
                this.filteredRole !== undefined &&
                this.filteredRole !== null &&
                this.filteredRole.length !== 0
            ) {
                this.fields.role = {
                    _id: this.filteredRole[0]._id,
                    name: this.filteredRole[0].name,
                };
            }
        }
    }

    onOptionsSelectedGroup() {
        if (this.group !== null && this.group !== undefined) {
            this.filteredGroup = this.allGroup.filter((t) => t._id == this.group);

            if (
                this.filteredGroup !== undefined &&
                this.filteredGroup !== null &&
                this.filteredGroup.length !== 0
            ) {
                this.fields.group = {
                    _id: this.filteredGroup[0]._id,
                    name: this.filteredGroup[0].name,
                };
            }
        }
    }
}
