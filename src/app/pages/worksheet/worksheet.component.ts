import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/global/auth.service';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import { HelperService } from 'src/app/services/helper.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-worksheet',
    templateUrl: './worksheet.component.html',
    styleUrls: ['./worksheet.component.scss'],
})
export class WorksheetComponent implements OnInit {
    allData: any[] = [];
    loading: boolean = false;
    auth: any;
    allWebsite: any[] = [];
    websiteId: boolean = false;
    loadingSmsBtn: boolean = false;
    loadingWaBtn: boolean = false;
    loadingEmailBtn: boolean = false;
    selectedData: any[] = [];
    action: String = "";

    filter = {
        websiteId: '',
    };

    p: number = 1;
    totalData: number = 0;

    updateFilters() {
        this.getPage(1);
    }

    constructor(
        private service: WorksheetService,
        private authService: AuthService,
        private helper: HelperService,
        private websiteService: WebsiteService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.auth = this.authService.Auth();
        // console.log(this.auth);

        if (this.auth['group']._id != '0' || this.auth['nucode'] == "system") {
            this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
                response['data'].forEach((value) => {
                    if(this.auth['nucode'] == "system"){
                        this.allWebsite.push(value);
                    }
                    else if(
                        this.auth['group']['website']['ids'].includes(value._id)
                    ) {
                        this.allWebsite.push(value);
                    }
                });
            });
        }
    }

    getPage(page: number) {
        this.loading = true;
        this.service.initializeData(this.filter, page).subscribe((response) => {
            if(response['total_data'] > 0){
                this.allData = response['data'];
                this.totalData = response['total_data'];
            }else{
                this.allData = [];
                this.totalData = 0;
                this.helper.showAlert("warning", "Warning!", "No Data Found");
            }
            this.loading = false;
            this.p = page;

        });
    }

    hidePhone(data) {
        return this.helper.hidePhone(data);
    }

    showData(id, event) {
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
                .processWhatsapp('Available', this.filter.websiteId, '', this.selectedData)
                .subscribe((response) => {
                    if (response.result === true) {
                        this.helper.showAlert('success', 'Success!', response.response)
                        this.selectedData = [];
                    } else {
                        this.helper.showAlert('error', 'Error!', response.response)
                        this.selectedData = [];
                    }
                    this.loadingWaBtn = false;
                    this.action = "";
                    this.selectedData = [];
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
                .processSms('Available', this.filter.websiteId, '', this.selectedData)
                .subscribe((response) => {
                    if (response.result === true) {
                        this.helper.showAlert('success', 'Success!', response.response)
                    } else {
                        this.helper.showAlert('error', 'Error!', response.response)
                    }
                    this.loadingSmsBtn = false;
                    this.action = "";
                    this.selectedData = [];
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
                .processEmail('Available', this.filter.websiteId, '', this.selectedData)
                .subscribe((response) => {
                    if (response.result === true) {
                        this.helper.showAlert('success', 'Success!', response.response)
                    } else {
                        this.helper.showAlert('error', 'Error!', response.response)
                       
                    }
                    this.loadingEmailBtn = false;
                    this.action = "";
                    this.selectedData = [];
                    this.getPage(1);
                    
                });
        }
    }

    startWorksheet() {
        this.router.navigate([
            '/worksheet/start/' + this.filter.websiteId,
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
            this.helper.showLoadingModal("Processing SMS...");
            this.processSms();
        }

        if(this.action == 'send-wa'){
            this.helper.showLoadingModal("Processing Whatsapp...");
            this.processWhatsapp();
        }

        if(this.action == 'send-email'){
            this.helper.showLoadingModal("Processing Email...");
            this.processEmail();
        }
    }
}


