import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SmsService } from 'src/app/services/sms/sms.service';

@Component({
    selector: 'app-sent',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.scss'],
})
export class SentComponent implements OnInit {
    fields = {
        platform: 'Website',
        phone: '',
        message: '',
    };

    constructor(
        private route: ActivatedRoute,
        private service: SmsService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    submit() {
        this.fields = {
            platform: 'Website',
            phone: this.fields['phone'],
            message: this.fields['message'],
        };

        this.service.sendSingleSMS(this.fields).subscribe((response) => {
            if (response.result === true) {
                console.log('SMS sent successfully');
                this.router.navigate(['/sms/sent']);
            }
        });
    }
}
