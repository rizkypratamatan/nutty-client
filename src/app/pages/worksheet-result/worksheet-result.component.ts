import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-worksheet-result',
  templateUrl: './worksheet-result.component.html',
  styleUrls: ['./worksheet-result.component.scss']
})

export class WorksheetResultComponent implements OnInit {
  allData: any[] = [];
  loading: boolean = false;
  allWebsite: any[] = [];
  websiteId: boolean= false;
  auth:any;

  filter = {
      'filter_name' : '',
      'filter_phone' : '',
      'filter_status' : '',
      'filter_user' : '',
      'filter_username' : '',
      'filter_website' : '',
      'filter_whatsapp' : '',
      'filter_date' : ''
  };

  p: number = 1;
  totalData: number;

  datePickerOption: FlatpickrOptions = {
    dateFormat: 'Y/m/d',
    mode: 'range', 
    onChange: ( selectedDates: any ) => {  
      if(typeof selectedDates[1]  != "undefined"){
        this.filter.filter_date = this.helper.initializeDate(selectedDates[0])+" to "+this.helper.initializeDate(selectedDates[1]); 
      }else{
        this.filter.filter_date = this.helper.initializeDate(selectedDates[0]); 
      }
      this.updateFilters();
      
    }
  }

  updateFilters() {
    console.log(this.filter)
      this.getPage(1);
  }

  constructor(
      private service: WorksheetService,
      private userService: UserService,
      private websiteService: WebsiteService,
      private helper: HelperService
  ) {}

  ngOnInit(): void {
      this.auth = this.userService.Auth();
      
      if(this.auth['role'].name.toLowerCase() == 'system'){
        this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
            this.allWebsite = response['data'];
            // this.getPage(1);
        });
      }else{
        if(this.auth['group']._id){
            this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
                response['data'].forEach(value => {
                if(this.auth['group']['website']['ids'].includes(value._id)){
                    this.allWebsite.push(value);
                }
                });
            });
        }
      }
      this.getPage(1);
  }

  getPage(page: number) {
      this.loading = true;
      this.service.getResult(this.filter, page).subscribe((response) => {
          this.allData = response['data'];
          this.p = page;
          this.totalData = response['total_data'];
          this.loading = false;
      });
  }

  hidePhone(data) {
      return this.helper.hidePhone(data);
  }

  initializeTimestamp(timestamp) {
    return this.helper.initializeTimestamp(timestamp);
  }

}
