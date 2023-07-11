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
  styleUrls: ['./worksheet-crm.component.scss']
})
export class WorksheetCrmComponent implements OnInit {
  allData: any[] = [];
  loading: boolean = false;
  allWebsite: any[] = [];
  websiteId: boolean= false;
  auth:any;

  filter = {
      'websiteId' : '',
      'days' : 1
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
  }

  getPage(page: number) {
      this.loading = true;
      this.service.getAllCrm(this.filter, page).subscribe((response) => {
          this.allData = response['data'];
          this.p = page;
          this.totalData = response['total_data'];
          this.loading = false;
      });
  }

  edit(id) {
      this.router.navigate(['/database/add-edit/' + id]);
  }

  hidePhone(data) {
      let result = "";

      let dataArray = String(data).split("");

      dataArray.forEach(function(value, key) {

          if(key < dataArray.length - 3) {

              result += "*";

          } else {

              result += value;

          }

      });

      return result;
  }

  startCrm(id, event){
    this.websiteId = true;
    this.filter.websiteId = id;

    this.getPage(1);
  }

  initializeTimestamp(timestamp) {

    return this.helper.initializeTimestamp(timestamp);

  }

}
