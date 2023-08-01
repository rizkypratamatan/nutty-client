import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/global/auth.service';
import { SettingService } from 'src/app/services/setting/setting.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
    isValid: boolean = true;
    errorMsg: any[] = [];
    loadingIndicator: boolean = false;
    idSetting: string = '';

    fields = {
        platform: 'Website',
        intervalSMS: '',
        intervalWhatsApp: '',
        intervalEmail: '',
    };

    constructor(
        private service: SettingService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.service.getAllSetting(this.fields).subscribe((response) => {
            if (response.dataSetting != undefined) {
                response.dataSetting.forEach((element) => {
                    if (element.name == 'interval_sms') {
                        this.fields.intervalSMS = element.value;
                    }

                    if (element.name == 'interval_wa') {
                        this.fields.intervalWhatsApp = element.value;
                    }

                    if (element.name == 'interval_email') {
                        this.fields.intervalEmail = element.value;
                    }
                });
            } else {
                this.fields.intervalSMS = '';
                this.fields.intervalWhatsApp = '';
                this.fields.intervalEmail = '';
            }
        });
    }

    submit() {
        this.errorMsg = [];
        this.validateInput();
        if (this.isValid) {
            this.loadingIndicator = true;
            // this.update();
            // console.log(this.fields);
            this.service.updateSetting(this.fields).subscribe((response) => {
                if (response.result === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Update Setting Success',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });

                    this.reloadComponent();
                }
            });
        }
    }

    validateInput() {
        this.isValid = true;
        if (!this.fields.intervalSMS) {
            this.isValid = false;
            this.errorMsg.push('Interval SMS Field is Required');
        }

        if (!this.fields.intervalWhatsApp) {
            this.isValid = false;
            this.errorMsg.push('Interval WhatsApp Field is Required');
        }

        if (!this.fields.intervalEmail) {
            this.isValid = false;
            this.errorMsg.push('Interval Email Field is Required');
        }
    }

    reloadComponent() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/settings']);
    }
}