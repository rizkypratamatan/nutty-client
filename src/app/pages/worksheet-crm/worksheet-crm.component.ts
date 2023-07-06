import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { WebsiteService } from 'src/app/services/website/website.service';
import { UserService } from 'src/app/services/user/user.service';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';

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
      private websiteService: WebsiteService
  ) {}

  ngOnInit(): void {
      let auth = this.userService.Auth();
      console.log(auth)
      
      if(auth['role'].name.toLowerCase() == 'system'){
          this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
              this.allWebsite = response['data'];
              // this.getPage(1);
          });
          
      }else{
          if(auth['group']._id){
            this.websiteId = true;
            this.filter.websiteId = auth['group']._id;
          }
          this.getPage(1);
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

  delete(id, name) {
      let data = {
          platform: 'Website',
          id: id,
          website:{
              id: this.filter.websiteId
          }
      };

      if (confirm('Are you sure to delete data: ' + name)) {
          this.service.deleteDatabase(data).subscribe((response) => {
              if (response.result === true) {
                  Swal.fire({
                      title: 'Success!',
                      text: response.response,
                      icon: 'success',
                      confirmButtonText: 'Close'
                  });
                  this.getPage(1)
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

    let date = new Date();
    date.setTime(timestamp);

    return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);

  }

}
