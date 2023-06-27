import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email/email.service';

@Component({
    selector: 'app-read-email',
    templateUrl: './read-email.component.html',
    styleUrls: ['./read-email.component.scss'],
})
export class ReadEmailComponent implements OnInit {
    allEmails: any[] = [];
    allStatus: any[] = [];
    loading: boolean = false;

    fields = {
        platform: 'Website',
        from_name: '',
        email: '',
        subject: '',
        message: '',
        attachment: '',
        initiated_time: '',
        schedule_status: 'now',
        status: '',
    };

    filter = {};
    p: number = 1;
    totalEmail: number;

    typeFilter = ['Administrator', 'CRM', 'Telemarketer'];
    statusFilter = ['Active', 'Inactive'];

    updateFilters() {
        this.getPage(1);
    }

    constructor(private service: EmailService) {}

    ngOnInit(): void {
      this.getPage(1)
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getEmails(this.fields, page).subscribe((response) => {
            // console.log(response);
            this.allEmails = response['data'];
            this.p = page;
            this.allStatus = this.statusFilter;
            this.totalEmail = response['total_data'];
            this.loading = false;
        });
    }
}
