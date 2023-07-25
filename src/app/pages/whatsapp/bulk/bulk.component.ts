import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/global/data.service';
import { WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-bulk',
    templateUrl: './bulk.component.html',
    styleUrls: ['./bulk.component.scss'],
})
export class WABulkComponent implements OnInit {
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
        campaign: '',
        recipients: '',
        groups: '',
        type: 'text',
        message: '',
    };

    constructor(
        private route: ActivatedRoute,
        private service: WhatsappService,
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
            recipients: this.numbers,
            message: this.fields['message'],
            campaign: '',
            groups: '',
            type: 'text',
        };

        if (this.isValid) {
            this.loadingIndicator = true;
            this.service.sendBulkChat(this.fields).subscribe((response) => {
                if (response.result === true) {
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
            platform: 'Website',
            campaign: '',
            recipients: '',
            groups: '',
            type: 'text',
            message: '',
        };
    }
}
