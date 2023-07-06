import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { FlatpickrOptions } from 'ng2-flatpickr';


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditApiComponent implements OnInit {
  id: string;
  isAddMode: boolean;
  status = ['Active', 'Inactive'];
  isValid: boolean =  true;
  errorMsg: any[] = [];
  loadingIndicator : boolean = false;
  loadingSync : boolean = false;
  response: any;

  name: any = '';
  nucode: any = '';

  fields = {
      platform: 'Website',
      timestamp: '',
      token: '',
      start: '',
      sync:'Synced',
      api: {
        nexus: {
          code:'',
          url:'',
          salt:''
        }
      },
  };

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private service: ApiService
  ) {}

  ngOnInit(): void {
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;

      if (!this.isAddMode) {
          this.service.getApiById(this.id).subscribe((response) => {
                this.response = response['data'];
                this.name = response['data'].name;
                this.nucode = response['data'].nucode;
                this.fields.sync = (response['data'].sync)?response['data'].sync:"NoSync";
                this.fields.start = this.initializeDate(response['data'].start.$date.$numberLong);
                this.fields.api.nexus.code = response['data'].api.nexus.code;
                this.fields.api.nexus.url = response['data'].api.nexus.url;
                this.fields.api.nexus.salt = response['data'].api.nexus.salt;
          });
      }
  }

  datePickerOption: FlatpickrOptions = {
    "dateFormat": "Y/m/d"
  }

  private initializeDate(timestamp) {

    let date = new Date();
    date.setTime(timestamp);

    return date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);

  }

  submit() {
      this.errorMsg = [];
      this.validateInput();
      if(this.isValid){
          this.loadingIndicator = true
          if (this.isAddMode) {
              this.create();
          } else {
              this.update();
          }
      }
      
  }

  validateInput(){
      this.isValid = true;
      if(!this.fields.start){
          this.isValid = false;
          this.errorMsg.push("Start is Required");
      }
      // if(!this.fields.api.nexus.code){
      //     this.isValid = false;
      //     this.errorMsg.push("Nucode is Required");
      // }
      // if(!this.fields.api.nexus.url){
      //     this.isValid = false;
      //     this.errorMsg.push("Description is Required");
      // }
      // if(!this.fields.api.nexus.salt){
      //     this.isValid = false;
      //     this.errorMsg.push("Status is Required");
      // }
      
  }

  private create(){
    console.log("create")
  }

  sync(){
    this.loadingSync = true;
    let id = this.id;
      this.service.syncApi(id).subscribe((response) => {
          if (response.result === true) {
              this.loadingSync = false;
              Swal.fire({
                  title: 'Success!',
                  text: response.response,
                  icon: 'success',
                  confirmButtonText: 'Close'
              });
              this.router.navigate(['/api']);
          }else{
            this.loadingSync = false;
            Swal.fire({
              title: 'Error!',
              text: response.response,
              icon: 'error',
              confirmButtonText: 'Close'
          });
          }
      });
  }

  private update() {
      let id = this.id;

      this.service.updateApi(id, this.fields).subscribe((response) => {
          if (response.result === true) {
              this.loadingIndicator = false
              Swal.fire({
                  title: 'Success!',
                  text: response.response,
                  icon: 'success',
                  confirmButtonText: 'Close'
              });
              this.router.navigate(['/api']);
          }else{
            this.loadingIndicator = false
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
