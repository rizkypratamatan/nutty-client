import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import { WebsiteService } from 'src/app/services/website/website.service';
import { UserGroupService } from 'src/app/services/user/user-group.service';

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
  fields = {
    'platform' : 'Website',
    'group_id' : '',
    'website_id' : '',

  }

  constructor(
    private webService: WebsiteService,
    private groupService: UserGroupService
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

  }



}
