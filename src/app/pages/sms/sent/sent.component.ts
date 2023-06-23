import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsService } from 'src/app/services/sms/sms.service';
import { DataService } from 'src/app/services/global/data.service';
import Swal from 'sweetalert2';
import { HistoryComponent } from '../history/history.component';

@Component({
    selector: 'app-sent',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.scss'],
})
export class SMSSentComponent implements OnInit {
    allPrefix: any[];
    selectedPrefix = '62';
    id: string;

    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;
    isSubmit: boolean = false;

    phone: string;

    fields = {
        platform: 'Website',
        phone: '',
        message: '',
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
            phone: '+' + this.selectedPrefix + this.phone,
            message: this.fields['message'],
        };

        if (this.isValid) {
            this.loadingIndicator = true;
            this.service.sendSingleSMS(this.fields).subscribe((response) => {
                if (response.status === true) {
                    this.isSubmit = false;
                    this.formReset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Sent SMS Success',
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
        if (!this.phone) {
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
        this.phone = '';
        this.fields = {
            platform: '',
            phone: '',
            message: '',
        };
    }
}
