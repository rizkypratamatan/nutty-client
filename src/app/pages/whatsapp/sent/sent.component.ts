import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WhatsappService } from 'src/app/services/whatsapp/whatsapp.service';

@Component({
    selector: 'app-sent',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.scss'],
})
export class WASentComponent implements OnInit {
    fields = {
        platform: 'Website',
        campaign: '',
        recipient: '',
        type: 'text',
        message: '',
    };

    constructor(
        private route: ActivatedRoute,
        private service: WhatsappService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    submit() {
        this.fields = {
            platform: 'Website',
            campaign: '',
            recipient: this.fields['recipient'],
            type: 'text',
            message: this.fields['message'],
        };

        this.service.sendSingleChat(this.fields).subscribe((response) => {
            // console.log(response);

            if (response.status === true) {
                // console.log('WhatsApp Message sent successfully');
                this.router.navigate(['/whatsapp/sent']);
            }
        });
    }
}
