import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsiteService } from 'src/app/services/website/website.service';
import { UserGroupService } from 'src/app/services/user/user-group.service';
import { DatabaseImportService } from 'src/app/services/database-import/database-import.service';

@Component({
  selector: 'app-database-import',
  templateUrl: './database-import.component.html',
  styleUrls: ['./database-import.component.scss']
})
export class DatabaseImportComponent implements OnInit {

  websites: any;
  totalWebsite: number;
  groups: any;
  totalGroups: number;
  loadingIndicator: boolean = false;
  fields = {
    'platform' : 'Website',
    'group_id' : '',
    'website_id' : '',

  }

  constructor(
    private webService: WebsiteService,
    private groupService: UserGroupService,
    private databaseImportService: DatabaseImportService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getWebsites();
    this.getGroups();
    
  }

  getWebsites(){
    this.webService.getAllWebsite({}, 1).subscribe((response) => {
        this.websites = response['data'];
        this.totalWebsite = response['total_data'];
    });
  }

  getGroups(){
    this.groupService.getAllGroup({}, 1).subscribe((response) => {
        this.groups = response['dataUser'];
        this.totalGroups = response['total_data'];
    });
  }

  selectFile(){
    if(this.fields.website_id){
      $("#database-import-data").click();
    }else{
      Swal.fire({
        title: 'Warning!',
        text: 'Please select Website',
        icon: 'error',
        confirmButtonText: 'Close'
      })
    } 
  }
  
  processFile(){
    this.loadingIndicator = true;
    let formData = new FormData();

    formData.append("group", this.fields.group_id);
    formData.append("website", this.fields.website_id);
    let file = $("#database-import-data").prop('files')[0];
    formData.append("file", file);

    this.databaseImportService.import(formData).subscribe((response) => {
      if(response['result']){
        Swal.fire({
          title: 'Success!',
          text: response['response'],
          icon: 'success',
          confirmButtonText: 'Close'
        });
        
        this.loadingIndicator = true;
        this.router.navigate(['/database/history']);
      }else{
        Swal.fire({
          title: 'Error!',
          text: response['response'],
          icon: 'error',
          confirmButtonText: 'Close'
        });

        this.loadingIndicator = true;
        this.router.navigate(['/database/import']);
      }
    });
  }



}
