import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { UserService } from 'src/app/services/user/user.service';

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

    isValid: boolean =  true;
    errorMsg: any[] = [];
    loadingIndicator : boolean = false;

    id: string;
    isAddMode: boolean;

    fields = {
        username: '',
        name: '',
        password: '',
        nucode: '',
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
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
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
                this.role = response.dataUser.role._id.$oid;
                this.group = response.dataUser.group._id.$oid

                this.fields = {
                    username: response.dataUser.username,
                    name: response.dataUser.name,
                    password: '',
                    nucode: response.dataUser.nucode,
                    type: response.dataUser.type,
                    role: {
                        "_id": response.dataUser.role._id.$oid,
                        "name": response.dataUser.role.name
                    },
                    group: {
                        "_id": response.dataUser.group._id.$oid,
                        "name": response.dataUser.group.name
                    },
                    status: response.dataUser.status,
                    platform: 'Website',
                    gender: response.dataUser.gender
                        ? response.dataUser.gender
                        : '',
                    contact: {
                        email: response.dataUser.email
                            ? response.dataUser.email
                            : '',
                        fax: response.dataUser.fax ? response.dataUser.fax : '',
                        line: response.dataUser.line
                            ? response.dataUser.line
                            : '',
                        michat: response.dataUser.michat
                            ? response.dataUser.michat
                            : '',
                        phone: response.dataUser.phone
                            ? response.dataUser.phone
                            : '',
                        wechat: response.dataUser.wechat
                            ? response.dataUser.wechat
                            : '',
                        whatsapp: response.dataUser.whatsapp
                            ? response.dataUser.whatsapp
                            : '',
                        telegram: response.dataUser.telegram
                            ? response.dataUser.telegram
                            : '',
                    },
                    country: response.dataUser.country
                        ? response.dataUser.country
                        : '',
                    city: response.dataUser.city ? response.dataUser.city : '',
                    street: response.dataUser.street
                        ? response.dataUser.street
                        : '',
                    zip: response.dataUser.zip ? response.dataUser.zip : '',
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
        if(!this.fields.username){
            this.isValid = false;
            this.errorMsg.push("Username is Required");
        }
        if(!this.fields.name){
            this.isValid = false;
            this.errorMsg.push("Name is Required");
        }
        if(this.isAddMode){
            if(!this.fields.password){
                this.isValid = false;
                this.errorMsg.push("Password is Required");
            }
        }
        if(!this.fields.nucode){
            this.isValid = false;
            this.errorMsg.push("Nucode is Required");
        }
        if(!this.fields.type){
            this.isValid = false;
            this.errorMsg.push("Type is Required");
        }
        if(!this.fields.role){
            this.isValid = false;
            this.errorMsg.push("Role is Required");
        }
        if(!this.fields.group){
            this.isValid = false;
            this.errorMsg.push("Type is Required");
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
            }
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
                this.router.navigate(['/user']);
            }
        });
    }

    onOptionsSelectedRole() {
        console.log(this.role);

        if (this.role !== null && this.role !== undefined) {
            this.filteredRole = this.allRoles.filter((t) => t._id == this.role);
            console.log(this.filteredRole);
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
        // console.log(this.group);

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
