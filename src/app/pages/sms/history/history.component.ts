import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SmsService } from 'src/app/services/sms/sms.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
    allSMS: any[] = [];
    allStatus: any[] = [];

    fields = {
        name: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalSMS: number;

    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        Object.keys(this.fields).forEach((key) =>
            this.fields[key] === '' ? delete this.fields[key] : key
        );
        this.filter = Object.assign({}, this.fields);
    }

    constructor(private service: SmsService, private router: Router) {}

    ngOnInit(): void {
        this.service.getAllSMS().subscribe((response) => {
          console.log(response);
          // return;
            this.allSMS = response['data'];
            // this.allStatus = this.statusFilter;
            this.totalSMS = this.allSMS.length;
        });
    }
}
