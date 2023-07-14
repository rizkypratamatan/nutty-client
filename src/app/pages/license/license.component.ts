import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LicenseService } from 'src/app/services/license/license.service';
import { UserService } from '../contacts/userlist/user.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import Swal from 'sweetalert2';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-license',
    templateUrl: './license.component.html',
    styleUrls: ['./license.component.scss'],
})
export class LicenseComponent implements OnInit {
    allLicense: any[] = [];
    allType: any[] = [];
    allGroup: any[] = [];
    allRole: any[] = [];
    allStatus: any[] = [];
    limit: number = 10;
    offset: number = 0;
    page: number = 1;
    loading: boolean = false;

    fields = {
        nucode: '',
    };

    // filter = {};
    p: number = 1;
    totalLicense: number;

    updateFilters() {
        this.getPage(1);
    }
    constructor(
        private service: LicenseService,
        private router: Router,
        
    ) {}

    ngOnInit(): void {
      this.getPage(1);
    }

    getPage(page: number) {
      this.loading = true;
      this.service.getAllLicense(this.fields, page).subscribe((response) => {
        // console.log(response['data']);
          this.allLicense = response['data'];
          this.p = page;
          this.totalLicense = response['total_data'];
          this.loading = false;
      });
  }

  create() {
      this.router.navigate(['/license/add-edit']);
  }

  edit(id) {
      this.router.navigate(['/license/add-edit/' + id]);
  }

  delete(id, name) {
      const currentUrl = this.router.url;
      // console.log(currentUrl);

      let data = {
          platform: 'Website',
          id: id,
      };

      if (confirm('Are you sure to delete license: ' + name)) {
          this.service.deleteLicense(data).subscribe((response) => {
              // console.log(response);
              if (response.result === true) {
                  this.getPage(1)
                  Swal.fire({
                    title: 'Success!',
                    text: response['response'],
                    icon: 'success',
                    confirmButtonText: 'Close'
                  });
                }else{
                  Swal.fire({
                    title: 'Error!',
                    text: response['response'],
                    icon: 'error',
                    confirmButtonText: 'Close'
                  });
                }
          });
      }
  }
}
