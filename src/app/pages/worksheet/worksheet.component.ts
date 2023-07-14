import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/global/auth.service';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import { HelperService } from 'src/app/services/helper.service';
import { WebsiteService } from 'src/app/services/website/website.service';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {

  allData: any[] = [];
  loading: boolean = false;
  auth:any;
  allWebsite: any[] = [];
  websiteId: boolean= false;

  filter = {
      'websiteId' : ''
  };

  p: number = 1;
  totalData: number;

  updateFilters() {
      this.getPage(1);
  }

  constructor(
      private service: WorksheetService,
      private authService: AuthService,
      private helper: HelperService,
      private websiteService: WebsiteService
  ) {}

  ngOnInit(): void {
    this.auth = this.authService.Auth();
    
    if(this.auth['group']._id != "0"){
        this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
            response['data'].forEach(value => {
                if(this.auth['group']['website']['ids'].includes(value._id)){
                    this.allWebsite.push(value);
                }
            });
        });
    }
  }

  getPage(page: number) {
      this.loading = true;
      this.service.initializeData(this.filter, page).subscribe((response) => {
          this.allData = response['data'];
          this.totalData = response['total_data'];
          this.loading = false;
          this.p = page;
      });
  }

  hidePhone(data) {
      return this.helper.hidePhone(data);
  }

  showData(id, event){
    this.websiteId = true;
    this.filter.websiteId = id;
    this.getPage(1);
  }

  initializeTimestamp(timestamp) {
      return this.helper.initializeTimestamp(timestamp);
  }

  processWhatsapp(){
      this.service.processWhatsapp('Available', this.filter.websiteId, '').subscribe((response) => {
          if (response.result === true) {
              Swal.fire({
                  title: 'Success!',
                  text: response.response,
                  icon: 'success',
                  confirmButtonText: 'Close'
              });
          }else{
            Swal.fire({
              title: 'Error!',
              text: response.response,
              icon: 'error',
              confirmButtonText: 'Close'
          });
          }
      });
  }

  processSms(){
    this.service.processSms('Available', this.filter.websiteId, '').subscribe((response) => {
        if (response.result === true) {
            Swal.fire({
                title: 'Success!',
                text: response.response,
                icon: 'success',
                confirmButtonText: 'Close'
            });
        }else{
          Swal.fire({
            title: 'Error!',
            text: response.response,
            icon: 'error',
            confirmButtonText: 'Close'
        });
        }
    });
  }

  processEmail(){
    this.service.processEmail('Available', this.filter.websiteId, '').subscribe((response) => {
        if (response.result === true) {
            Swal.fire({
                title: 'Success!',
                text: response.response,
                icon: 'success',
                confirmButtonText: 'Close'
            });
        }else{
          Swal.fire({
            title: 'Error!',
            text: response.response,
            icon: 'error',
            confirmButtonText: 'Close'
        });
        }
    });
  }

}
