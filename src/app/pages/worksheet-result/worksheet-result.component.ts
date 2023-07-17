import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Router } from '@angular/router';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import { UserService } from 'src/app/services/user/user.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import { HelperService } from 'src/app/services/helper.service';
import { ActivatedRoute } from '@angular/router';

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
  locked: boolean = true;
  allUsers: any;

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
      this.getPage(1);
  }

  constructor(
      private service: WorksheetService,
      private userService: UserService,
      private websiteService: WebsiteService,
      private helper: HelperService,
      private router: Router,
      private activateRoute: ActivatedRoute
  ) {
    this.auth = this.userService.Auth();
  }

  ngOnInit(): void {
      
      if(this.auth['role'].name.toLowerCase() == 'system'){
        this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
            this.allWebsite = response['data'];
            // this.getPage(1);
        });
        
        this.userService.getAllUser({}, 1).subscribe((response) => {
          this.allUsers = response['dataUser'];
        });

        this.activateRoute.queryParams
          .subscribe(params => {
            this.filter.filter_user = params.id;
          }
        );
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

  followUpCall(id, websiteId){

    this.router.navigate(['/worksheet/call/' + id + '/' + websiteId]);
  }

}
