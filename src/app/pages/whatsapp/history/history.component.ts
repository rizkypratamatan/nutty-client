import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class WAHistoryComponent implements OnInit {
    allChats: any[] = [];
    allStatus: any[] = [];
    loading: boolean = false;

    fields = {
        recipient: '',
        message: '',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalChats: number;

    statusFilter = ['sent', 'queued'];

    updateFilters() {
        // Object.keys(this.fields).forEach((key) =>
        //     this.fields[key] === '' ? delete this.fields[key] : key
        // );
        // this.filter = Object.assign({}, this.fields);

        this.getPage(1);
    }

    constructor(private service: WhatsappService, private router: Router) {}

    ngOnInit(): void {
        this.getPage(1);
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllWA(this.fields, page).subscribe((response) => {
            this.allChats = response['data'];
            this.p = page;
            this.allStatus = this.statusFilter;
            this.totalChats = response['total_data'];
            this.loading = false;
        });
    }
}
