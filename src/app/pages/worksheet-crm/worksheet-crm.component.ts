import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WebsiteService } from 'src/app/services/website/website.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-worksheet-crm',
    templateUrl: './worksheet-crm.component.html',
    styleUrls: ['./worksheet-crm.component.scss'],
})
export class WorksheetCrmComponent implements OnInit {
    allData: any[] = [];
    loading: boolean = false;
    allWebsite: any[] = [];
    websiteId: boolean = false;
    auth: any;
    loadingSmsBtn: boolean = false;
    loadingWaBtn: boolean = false;
    loadingEmailBtn: boolean = false;

    filter = {
        websiteId: '',
        days: 1,
    };

    p: number = 1;
    totalData: number;

    updateFilters() {
        this.getPage(1);
    }

    constructor(
        private service: WorksheetService,
        private router: Router,
        private userService: UserService,
        private websiteService: WebsiteService,
        private helper: HelperService
    ) {}

    ngOnInit(): void {
        this.auth = this.userService.Auth();

        //   if(this.auth['role'].name.toLowerCase() == 'system'){
        //     this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
        //         this.allWebsite = response['data'];
        //         // this.getPage(1);
        //     });
        //   }else{
        if (this.auth['group']._id != '0') {
            this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
                response['data'].forEach((value) => {
                    if (
                        this.auth['group']['website']['ids'].includes(value._id)
                    ) {
                        this.allWebsite.push(value);
                    }
                });
            });
        }
        //   }
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllCrm(this.filter, page).subscribe((response) => {
            if(response['total_data'] > 0){
                this.allData = response['data'];
                this.totalData = response['total_data'];
                
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: "Database Empty!",
                    icon: 'error',
                    confirmButtonText: 'Close',
                });
            }
            
            this.p = page;
            this.loading = false;
        });
    }

    edit(id) {
        this.router.navigate(['/database/add-edit/' + id]);
    }

    hidePhone(data) {
        let result = '';

        let dataArray = String(data).split('');

        dataArray.forEach(function (value, key) {
            if (key < dataArray.length - 3) {
                result += '*';
            } else {
                result += value;
            }
        });

        return result;
    }

    startCrm(id, event) {
        this.websiteId = true;
        this.filter.websiteId = id;

        this.getPage(1);
    }

    initializeTimestamp(timestamp) {
        return this.helper.initializeTimestamp(timestamp);
    }

    processWhatsapp() {
        this.loadingWaBtn = true;
        if (
            confirm(
                'Are you sure you want to proceed? Make sure the data is correct!'
            )
        ) {
            this.service
                .processWhatsapp('', this.filter.websiteId, this.filter.days)
                .subscribe((response) => {
                    if (response.result === true) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.response,
                            icon: 'success',
                            confirmButtonText: 'Close',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response.response,
                            icon: 'error',
                            confirmButtonText: 'Close',
                        });
                    }
                    this.loadingWaBtn = false;
                    this.getPage(1);
                });
        }
    }

    processSms() {
        this.loadingSmsBtn = true;
        if (
            confirm(
                'Are you sure you want to proceed? Make sure the data is correct!'
            )
        ) {
            this.service
                .processSms('', this.filter.websiteId, this.filter.days)
                .subscribe((response) => {
                    if (response.result === true) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.response,
                            icon: 'success',
                            confirmButtonText: 'Close',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response.response,
                            icon: 'error',
                            confirmButtonText: 'Close',
                        });
                    }
                    this.loadingSmsBtn = false;
                    this.getPage(1);
                });
        }
    }

    processEmail() {
        this.loadingEmailBtn = true;
        if (
            confirm(
                'Are you sure you want to proceed? Make sure the data is correct!'
            )
        ) {
            this.service
                .processEmail('', this.filter.websiteId, this.filter.days)
                .subscribe((response) => {
                    if (response.result === true) {
                        Swal.fire({
                            title: 'Success!',
                            text: response.response,
                            icon: 'success',
                            confirmButtonText: 'Close',
                        });
                    } else {
                        Swal.fire({
                            title: 'Error!',
                            text: response.response,
                            icon: 'error',
                            confirmButtonText: 'Close',
                        });
                    }
                    this.loadingEmailBtn = false;
                    this.getPage(1);
                });
        }
    }

    followUpCall(id) {
        this.router.navigate([
            '/worksheet/call/' + id + '/' + this.filter.websiteId,
        ]);
    }
}
