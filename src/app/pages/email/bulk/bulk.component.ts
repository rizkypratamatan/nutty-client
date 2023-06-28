import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/services/email/email.service';
import { DataService } from 'src/app/services/global/data.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-bulk',
    templateUrl: './bulk.component.html',
    styleUrls: ['./bulk.component.scss'],
})
export class BulkComponent implements OnInit {
    allPrefix: any[];
    selectedPrefix = '62';
    id: string;
    files: File[] = [];

    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;
    isSubmit: boolean = false;

    fields = {
        platform: 'Website',
        from_name: '',
        emails: '',
        subject: '',
        message: '',
        schedule_status: 'now',
        initiated_time: '',
    };

    constructor(
        private route: ActivatedRoute,
        private service: EmailService,
        private router: Router,
        private dataPrefix: DataService
    ) {}

    ngOnInit(): void {
        this.allPrefix = this.dataPrefix.phonePrefix();
        this.allPrefix.map((i) => {
            i.countryCode = i.country + ' (+' + i.code + ')';
            return i;
        });
    }

    submit() {
        this.errorMsg = [];
        this.isSubmit = true;
        this.validateInput();

        this.fields = {
            platform: 'Website',
            from_name: this.fields['from_name'],
            emails: this.fields['emails'],
            subject: this.fields['subject'],
            message: this.fields['message'],
            schedule_status: 'now',
            initiated_time: '',
        };

        if (this.isValid) {
            this.loadingIndicator = true;
            this.service.sendBulkEmail(this.fields).subscribe((response) => {
                if (response.status === true) {
                    this.isSubmit = false;
                    this.formReset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'SMS Bulk Sent Successfully',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });
                    // console.log('SMS sent successfully');
                    // this.router.navigate(['/sms/sent']);
                }
            });
        }
    }

    validateInput() {
        if (!this.fields.emails) {
            this.isValid = false;
            this.errorMsg.push('email is Required');
        }
        if (!this.fields.subject) {
            this.isValid = false;
            this.errorMsg.push('subject is Required');
        }
        if (!this.fields.message) {
            this.isValid = false;
            this.errorMsg.push('Message is Required');
        }
        if (this.fields.message.length <= 3) {
            this.isValid = false;
            this.errorMsg.push('Message is Too Short');
            this.isSubmit = false;
        }
    }

    formReset() {
        this.fields = {
            platform: 'Website',
            from_name: '',
            emails: '',
            subject: '',
            message: '',
            schedule_status: 'now',
            initiated_time: '',
        };
    }

    onSelect(event) {
        console.log(event);
        this.files.push(...event.addedFiles);
    }

    onRemove(event) {
        console.log(event);
        this.files.splice(this.files.indexOf(event), 1);
    }
}
