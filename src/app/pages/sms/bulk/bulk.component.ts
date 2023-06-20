import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/global/data.service';
import { SmsService } from 'src/app/services/sms/sms.service';

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
        this.fields = {
            platform: 'Website',
            phone: '+' + this.selectedPrefix + this.fields['phone'],
            message: this.fields['message'],
        };

        console.log(this.fields);
        return;

        this.service.sendSingleSMS(this.fields).subscribe((response) => {
            // console.log(response);

            if (response.status === true) {
                // console.log('SMS sent successfully');
                this.router.navigate(['/sms/sent']);
            }
        });
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
