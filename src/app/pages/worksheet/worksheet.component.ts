import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/global/auth.service';
import { WorksheetService } from 'src/app/services/worksheet/worksheet.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-worksheet',
  templateUrl: './worksheet.component.html',
  styleUrls: ['./worksheet.component.scss']
})
export class WorksheetComponent implements OnInit {

  allData: any[] = [];
  loading: boolean = false;
  auth:any;

  filter = {
      'websiteId' : ''
  };

  updateFilters() {
      this.getPage(1);
  }

  constructor(
      private service: WorksheetService,
      private authService: AuthService,
      private helper: HelperService
  ) {}

  ngOnInit(): void {
      this.auth = this.authService.Auth();
      this.getPage(1);
  }

  getPage(page: number) {
      this.loading = true;
      this.service.initializeData(this.filter, page).subscribe((response) => {
          this.allData = response['data'];
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
