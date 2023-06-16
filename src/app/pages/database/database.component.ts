import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
    allDatabase: any[] = [];

    fields = {
        city: '',
        contact: {
            email: '',
            line: '',
            michat: '',
            phone: '',
            telegram: '',
            wechat: '',
            whatsapp: '',
        },
        country: '',
        crm: {},
        gender: '',
        group: {},
        import: {},
        language: '',
        name: '',
        reference: '',
        state: '',
        status: '',
        street: '',
        telemarketer: {},
        zip: '',
        created: {},
        modified: {},
    };

    filter = {};
    p: number = 1;
    totalDatabase: number;

    typeFilter = ['Administrator', 'CRM', 'Telemarketer'];
    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        Object.keys(this.fields).forEach((key) =>
            this.fields[key] === '' ? delete this.fields[key] : key
        );
        this.filter = Object.assign({}, this.fields);
    }

    constructor(private service: DatabaseService, private router: Router) {}

    ngOnInit(): void {
        this.service.getAllWebsite().subscribe((response) => {
            this.allDatabase = response['data'];
            // this.allType = this.typeFilter;
            // this.allStatus = this.statusFilter;
            this.totalDatabase = this.allDatabase.length;
            // console.log(response);
        });
    }

    create() {
        this.router.navigate(['/database/add-edit']);
    }

    edit(id) {
        this.router.navigate(['/database/add-edit/' + id]);
    }
}
