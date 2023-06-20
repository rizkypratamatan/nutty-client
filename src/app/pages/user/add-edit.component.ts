import { Component, OnInit } from '@angular/core';
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

        this.userRoleService.getAllRole().subscribe((response) => {
            this.allRoles = response['data'];
        });

        this.userGroupService.getAllGroup({}).subscribe((response) => {
            this.allGroup = response['dataUser'];
        });

        if (!this.isAddMode) {
            this.userService.getUserById(this.id).subscribe((response) => {
                this.role = {
                    "_id": response.dataUser.role._id.$oid,
                    "name": response.dataUser.role.name
                };

                this.group = {
                    "_id": response.dataUser.group._id.$oid,
                    "name": response.dataUser.group.name
                };

                this.fields = {
                    username: response.dataUser.username,
                    name: response.dataUser.name,
                    password: '',
                    nucode: response.dataUser.nucode,
                    type: response.dataUser.type,
                    role: this.role,
                    group: this.group,
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
        if (this.isAddMode) {
            this.create();
        } else {
            this.update();
        }
    }

    private create() {
        this.fields = {
            username: this.fields['username'],
            name: this.fields['name'],
            password: this.fields['password'],
            nucode: this.fields['nucode'],
            type: this.fields['type'],
            role: this.role,
            group: this.group,
            status: this.fields['status'],
            platform: 'Website',
            gender: this.fields['gender'] ? this.fields['gender'] : '',
            contact: {
                email: this.fields['email'] ? this.fields['email'] : '',
                fax: this.fields['fax'] ? this.fields['fax'] : '',
                line: this.fields['line'] ? this.fields['line'] : '',
                michat: this.fields['michat'] ? this.fields['michat'] : '',
                phone: this.fields['phone'] ? this.fields['phone'] : '',
                wechat: this.fields['wechat'] ? this.fields['wechat'] : '',
                whatsapp: this.fields['whatsapp']
                    ? this.fields['whatsapp']
                    : '',
                telegram: this.fields['telegram']
                    ? this.fields['telegram']
                    : '',
            },
            country: this.fields['country'] ? this.fields['country'] : '',
            city: this.fields['city'] ? this.fields['city'] : '',
            street: this.fields['street'] ? this.fields['street'] : '',
            zip: this.fields['zip'] ? this.fields['zip'] : '',
        };

        this.userService.addUser(this.fields).subscribe((response) => {
            if (response.result === true) {
                this.router.navigate(['/user']);
            }
        });
    }

    private update() {
        let id = this.id;

        this.userService.updateUser(id, this.fields).subscribe((response) => {
            if (response.result === true) {
                this.router.navigate(['/user']);
            }
        });
    }

    onOptionsSelectedRole() {
        // console.log(this.role);

        if (this.role !== null && this.role !== undefined) {
            this.filteredRole = this.allRoles.filter((t) => t == this.role);

            if (
                this.filteredRole !== undefined &&
                this.filteredRole !== null &&
                this.filteredRole.length !== 0
            ) {
                this.role = {
                    _id: this.filteredRole[0]._id,
                    name: this.filteredRole[0].name,
                };
            }
        }
    }

    onOptionsSelectedGroup() {
        // console.log(this.group);

        if (this.group !== null && this.group !== undefined) {
            this.filteredGroup = this.allGroup.filter((t) => t == this.group);

            if (
                this.filteredGroup !== undefined &&
                this.filteredGroup !== null &&
                this.filteredGroup.length !== 0
            ) {
                this.group = {
                    _id: this.filteredGroup[0]._id,
                    name: this.filteredGroup[0].name,
                };
            }
        }
    }
}
