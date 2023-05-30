import { Component, OnInit } from '@angular/core';
import { UserGroupService } from 'src/app/services/user/user-group.service';

@Component({
    selector: 'app-user-group',
    templateUrl: './user-group.component.html',
    styleUrls: ['./user-group.component.scss'],
})
export class UserGroupComponent implements OnInit {
    allGroups: any[] = [];
    allStatus: any[] = [];

    fields = {
        name: '',
        website: '',
        nucode: '',
        type: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalGroup: number;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        Object.keys(this.fields).forEach((key) =>
            this.fields[key] === '' ? delete this.fields[key] : key
        );
        this.filter = Object.assign({}, this.fields);
    }

    constructor(private service: UserGroupService) {}

    ngOnInit(): void {
        this.service.getAllGroup().subscribe((response) => {
            this.allGroups = response['dataUser'];
            this.allStatus = this.statusFilter;
            this.totalGroup = this.allGroups.length;
            // console.log(response);
        });
    }
}
