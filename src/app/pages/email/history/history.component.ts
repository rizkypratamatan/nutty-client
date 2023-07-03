import { Component, OnInit } from '@angular/core';
import { EmailService } from 'src/app/services/email/email.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
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
        this.getPage(1);
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

    delete(id, phone) {
        let data = {
            platform: 'Website',
            id: id.$oid,
        };

        if (confirm('Are you sure to delete email: ' + phone)) {
            this.service.deleteEmail(data).subscribe((response) => {
                console.log(response);
                if (response.result === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Email deleted successfully',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });
                    this.getPage(1);
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: response.response,
                        icon: 'error',
                        confirmButtonText: 'Close',
                    });
                }
            });
        }
    }
}
