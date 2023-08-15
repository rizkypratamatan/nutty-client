import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatabaseService } from 'src/app/services/database/database.service';
import { AuthService } from 'src/app/services/global/auth.service';
import { WebsiteService } from 'src/app/services/website/website.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.scss'],
})
export class DatabaseComponent implements OnInit {
    allData: any[] = [];
    loading: boolean = false;
    allWebsite: any[] = [];

    filter = {
        'website' : '',
        'name'  : '',
        'phone' : ''        
    };

    p: number = 1;
    totalData: number;

    updateFilters() {
        this.getPage(1);
    }

    constructor(
        private service: DatabaseService, 
        private helper: HelperService,
        private router: Router,
        private authService: AuthService,
        private websiteService: WebsiteService
    ) {}

    ngOnInit(): void {
        let auth = this.authService.Auth();

        if(auth['role'].name.toLowerCase() == 'system'){
            this.websiteService.getAllWebsite({}, 1).subscribe((response) => {
                this.allWebsite = response['data'];
                this.filter.website = response['data'][0]['_id'];
                this.getPage(1);
            });
            
        }else{
            console.log(auth);
            this.filter.website = auth['website']['ids'][0];
            let arrWeb = [];

            auth['website']['ids'].forEach(function(value, index){
                let data = {
                    "_id" : auth['website']['ids'][index],
                    "name" : auth['website']['names'][index],
                }
                arrWeb.push(data);
            });

            this.allWebsite = arrWeb;
            this.getPage(1);
        }
    }

    getPage(page: number) {
        this.loading = true;
        this.service.getAllDatabase(this.filter, page).subscribe((response) => {
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
                id: this.filter.website
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

    initializeTimestamp(timestamp){
        return this.helper.initializeTimestamp(timestamp);
    }
}
