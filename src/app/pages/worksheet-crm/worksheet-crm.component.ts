import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    selectedData: any[] = [];
    websiteId: boolean = false;
    auth: any;
    loadingSmsBtn: boolean = false;
    loadingWaBtn: boolean = false;
    loadingEmailBtn: boolean = false;
    action: String= "";

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
                this.allData = [];
                this.totalData = 0;
                this.helper.showAlert('warning', 'Warning!', 'Database Empty!')
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
                .processWhatsapp('', this.filter.websiteId, this.filter.days, this.selectedData)
                .subscribe((response) => {
                    if (response.result === true) {
                        this.helper.showAlert('success', 'Success!', response.response)
                       
                    } else {
                        this.helper.showAlert('error', 'Error!', response.response)
                    }
                    this.loadingWaBtn = false;
                    this.selectedData = [];
                    this.action = "";
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
                .processSms('', this.filter.websiteId, this.filter.days, this.selectedData)
                .subscribe((response) => {
                    if (response.result === true) {
                        this.helper.showAlert('success', 'Success!', response.response);
                    } else {
                        this.helper.showAlert('error', 'Error!', response.response);
                    }
                    this.loadingSmsBtn = false;
                    this.selectedData = [];
                    this.action = "";
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
                .processEmail('', this.filter.websiteId, this.filter.days, this.selectedData)
                .subscribe((response) => {
                    if (response.result === true) {
                        this.helper.showAlert('success', 'Success!', response.response);
                    } else {
                        this.helper.showAlert('error', 'Error!', response.response);
                    }
                    this.loadingEmailBtn = false;
                    this.selectedData = [];
                    this.action = "";
                    this.getPage(1);
                });
        }
    }

    followUpCall(id) {
        this.router.navigate([
            '/worksheet/call/' + id + '/' + this.filter.websiteId,
        ]);
    }

    populateData(id: any, checked: boolean){
        if(checked){
            this.selectedData.push(id);
        }else{
            if(this.selectedData.length == 1){
                this.selectedData.pop()
            }else{
                let position = this.selectedData.indexOf(id);
                    if ( position ) this.selectedData.splice(position, 1);
            }
            
        }
    }

    processAction(){
        if(this.action == 'send-sms'){
            this.helper.showLoadingModal('Processing SMS...');
            this.processSms();
        }

        if(this.action == 'send-wa'){
            this.helper.showLoadingModal('Processing Whatsapp...');
            this.processWhatsapp();
        }

        if(this.action == 'send-email'){
            this.helper.showLoadingModal('Processing Email...');
            this.processEmail();
        }
    }
}
