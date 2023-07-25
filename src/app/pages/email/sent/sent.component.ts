import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/services/email/email.service';
import { DataService } from 'src/app/services/global/data.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
    selector: 'app-sent',
    templateUrl: './sent.component.html',
    styleUrls: ['./sent.component.scss'],
})
export class SentComponent implements OnInit {
    id: string;

    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;
    isSubmit: boolean = false;

    fields = {
        platform: 'Website',
        from_name: '',
        email: '',
        subject: '',
        message: '',
        schedule_status: 'now',
        initiated_time: '',
    };
    
    breadCrumbItems: Array<{}>;

    public Editor = ClassicEditor;

    constructor(
        private route: ActivatedRoute,
        private service: EmailService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    submit() {
        this.errorMsg = [];
        this.isSubmit = true;
        this.validateInput();

        this.fields = {
            platform: 'Website',
            from_name: this.fields['from_name'],
            email: this.fields['email'],
            subject: this.fields['subject'],
            message: this.fields['message'],
            schedule_status: 'now',
            initiated_time: '',
        };
        console.log(this.fields);

        if (this.isValid) {
            this.loadingIndicator = true;
            this.service.sendSingleEmail(this.fields).subscribe((response) => {
                if (response.result === true) {
                    this.isSubmit = false;
                    this.formReset();
                    Swal.fire({
                        title: 'Success!',
                        text: 'Email Sent Successfully',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });
                }
            });
        }
    }

    validateInput() {
        if (!this.fields.email) {
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
            email: '',
            subject: '',
            message: '',
            schedule_status: 'now',
            initiated_time: '',
        };
    }
}
