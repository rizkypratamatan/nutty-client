import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/global/data.service';
import { SmsService } from 'src/app/services/sms/sms.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-bulk',
    templateUrl: './bulk.component.html',
    styleUrls: ['./bulk.component.scss'],
})
export class SMSBulkComponent {
    allPrefix: any[];
    selectedPrefix = '62';
    id: string;
    files: File[] = [];

    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;
    isSubmit: boolean = false;

    numbers: string;

    fields = {
        platform: 'Website',
        numbers: '',
        message: '',
        campaign: '',
        group: '',
    };

    constructor(
        private route: ActivatedRoute,
        private service: SmsService,
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
            numbers: this.numbers,
            message: this.fields['message'],
            campaign: '',
            group: '',
        };

        if (this.isValid) {
            this.loadingIndicator = true;
            this.service.sendBulkSMS(this.fields).subscribe((response) => {
                if (response.status === true) {
                    this.isSubmit = false;
                    this.formReset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'SMS Bulk Sent Successfully',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });
                }
            });
        }
    }

    validateInput() {
        if (!this.numbers) {
            this.isValid = false;
            this.errorMsg.push('Phone is Required');
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
        this.numbers = '';
        this.fields = {
            platform: '',
            numbers: '',
            message: '',
            campaign: '',
            group: '',
        };
    }

    onSelect(event) {
        this.files.push(...event.addedFiles);
    }

    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
    }
}
