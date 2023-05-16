import { Component, OnInit } from '@angular/core';
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

    constructor(private service: UserService) {}

    ngOnInit(): void {
        this.service.getAllUser().subscribe((response) => {
            this.allUsers = response['dataUser'];
            this.allType = this.typeFilter;
            this.allStatus = this.statusFilter;
            this.totalUser = this.allUsers.length;
            console.log(this.totalUser);
        });

        this.service.getAllGroup().subscribe((response) => {
            this.allGroup = response['dataUser'];
        });

        this.service.getAllRole().subscribe((response) => {
            this.allRole = response['dataUser'];
        });
    }
}
