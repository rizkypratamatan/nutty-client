import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/global/alert.service';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  allRoles: any[] = [];
    allGroup: any[] = [];
    role: any = '';
    group: any = '';
    filteredRole: any;
    filteredGroup: any;
    confirm_password: string = '';

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
        private alertService: AlertService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.userRoleService.getAllRole().subscribe((response) => {
            this.allRoles = response['data'];
        });

        this.userGroupService.getAllGroup().subscribe((response) => {
            this.allGroup = response['dataUser'];
        });
    }

    submit() {
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
            // this.response = response;
            if(response.result === true){
              this.alertService.success('User added', { keepAfterRouteChange: true });
              this.router.navigate(['/user']);
            }
            // console.log(response);
        });

        // console.log(this.fields);
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
