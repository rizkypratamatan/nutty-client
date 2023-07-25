import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseImportService } from 'src/app/services/database-import/database-import.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-database-history',
  templateUrl: './database-history.component.html',
  styleUrls: ['./database-history.component.scss']
})
export class DatabaseHistoryComponent implements OnInit {
  loading: boolean = false;
  dataHistory: any;

  filter = {};
  p: number = 1;
  totalData: number;

  updateFilters() {
      this.getPage(1)
  }

  constructor(
      private service: DatabaseImportService,
      private router: Router
  ) {}

  ngOnInit(): void {
      this.getPage(1)
  }

  getPage(page: number) {
      this.loading = true;
      this.service.getHistory(page).subscribe((response) => {
          this.dataHistory = response['data'];
          this.p = page;
          this.totalData = response['total_data'];
          this.loading = false;
      });
  }

  delete(id, name) {
      if (confirm('Are you sure to delete user: ' + name)) {
          this.service.delete(id).subscribe((response) => {
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
