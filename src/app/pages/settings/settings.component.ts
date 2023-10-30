import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getStickyFooterScrollbar } from '@fullcalendar/core';
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
    allNucode: any[] = [];
    nucode: string = '';
    auth: any;

    fields = {
        platform: 'Website',
        intervalSMS: '',
        intervalWhatsApp: '',
        intervalEmail: '',
        mailgun_domain: '',
        mailgun_secret: '',
        from_name: '',
        from_email: '',
        gateway_apikey: '',
    };

    constructor(
        private service: SettingService,
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.auth = this.authService.Auth();


        if (this.auth['nucode'] == "system") {
            this.service.getAllNucode().subscribe((response) => {
                response['data'].forEach((value) => {
                    if(this.auth['nucode'] == "system"){
                        this.allNucode.push(value);
                    }
                });
            });
        }else{
            this.nucode = this.auth['nucode'];
            this.getSetting();
        }
    }

    showData(nucode, event){
        this.nucode = nucode;
        this.getSetting();
    }

    getSetting(){
        this.service.getAllSetting(this.fields, this.nucode).subscribe((response) => {
            if ((response.dataSetting != undefined) && (response.total_data > 0)) {
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

                    if (element.name == 'mailgun_domain') {
                        this.fields.mailgun_domain = element.value;
                    }

                    if (element.name == 'mailgun_secret') {
                        this.fields.mailgun_secret = element.value;
                    }

                    if (element.name == 'from_email') {
                        this.fields.from_email = element.value;
                    }

                    if (element.name == 'from_name') {
                        this.fields.from_name = element.value;
                    }

                    if (element.name == 'gateway_apikey') {
                        this.fields.gateway_apikey = element.value;
                    }
                });
            } else {
                this.fields.intervalSMS = '';
                this.fields.intervalWhatsApp = '';
                this.fields.intervalEmail = '';
                this.fields.mailgun_domain = '';
                this.fields.mailgun_secret = '';
                this.fields.from_name = '';
                this.fields.from_email = '';
                this.fields.gateway_apikey = '';
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
            this.service.updateSetting(this.fields, this.nucode).subscribe((response) => {
                if (response.result === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Update Setting Success',
                        icon: 'success',
                        confirmButtonText: 'Close',
                    });

                    this.reloadComponent();
                }else{
                    Swal.fire({
                        title: 'Error!',
                        text: 'Update Setting Error',
                        icon: 'error',
                        confirmButtonText: 'Close',
                    });
                }

                this.loadingIndicator = false;
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

        // if (!this.fields.mailgun_domain) {
        //     this.isValid = false;
        //     this.errorMsg.push('Interval Email Field is Required');
        // }

        // if (!this.fields.mailgun_secret) {
        //     this.isValid = false;
        //     this.errorMsg.push('Interval Email Field is Required');
        // }

        // if (!this.fields.gateway_apikey) {
        //     this.isValid = false;
        //     this.errorMsg.push('Interval Email Field is Required');
        // }
    }

    reloadComponent() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['/settings']);
    }
}
