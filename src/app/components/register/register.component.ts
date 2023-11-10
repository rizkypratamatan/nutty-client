import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';
import { ConfigurationService } from '../../configurations/configuration.service';
import { EncryptionService } from '../../services/global/encryption.service';
import { DataService } from '../../services/global/data.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public configuration: ConfigurationService;

  public response: string;

  public submit: boolean;

  public year: number = new Date().getFullYear();

  fields = {
    nucode: '',
    name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  };

  confirm_password: string;

  constructor(
    private configurationService: ConfigurationService,
    private dataService: DataService,
    private encryptionService: EncryptionService,
    private registerService: RegisterService,
    private router: Router,
  ) { 
    this.configuration = this.configurationService;
  }

  ngOnInit(): void {
    let account = localStorage.getItem('nu-account');
    
    if(this.configuration.application.nucode != "PUBLIC"){
      this.router.navigate(['/login']);
    }

    if (account) {
        this.router.navigate(['/dashboard']);
    }
  }

  register(){
    this.submit = true;

    this.registerService
        .register(this.fields)
        .subscribe((response) => {
            if (response.result) {
                this.dataService.alert('success', response.response);
                // window.location.href = '/login';
            } else {
                this.dataService.alert('error', response.response);
            }
        });
  }

  confirmPassword(password, confirm_password){
    if(password != confirm_password){
      return false;
    }

    return true;
  }

  checkFormLengthRequired(scope, input, response, min, max) {

    let result = this.checkLength(eval(scope), min, max);

    this.initializeResponse(input, response, result, "Please input between " + min + " - " + max + " characters");

    return result;

  }

  initializeResponse(input, response, result, error) {

    if(!result) {

        $("#" + input).removeClass("is-valid").addClass("is-invalid");
        $("#" + response).removeClass("valid-feedback").addClass("invalid-feedback").html(error);

    } else {

        $("#" + input).removeClass("is-invalid").addClass("is-valid");
        $("#" + response).removeClass("invalid-feedback").addClass("valid-feedback").html("Look's good");

    }
  }

  checkLength(string, min, max) {

    let result = false;

    if(string != "") {

        if(string.length >= min && string.length <= max) {

            result = true;

        }

    }

    return result;

  }

  checkFormEmail(scope, input, response) {

    let result = false;

    if(eval(scope) != "") {
        if(eval(scope).match(/^([0-9A-Za-z_\-\.]){1,}\@([0-9A-Za-z_\-\.]){1,}\.([A-Za-z]){2,}$/)) {
            result = true;
        }
    } else {
        result = true;
    }

    this.initializeResponse(input, response, result, "Please input valid email address")

    return result;

  }

  checkFormPassword = function(scope, input, response) {

    let result = false;

    if(eval(scope).length < 3) {

        $("#" + input).removeClass("is-valid").addClass("is-invalid");
        $("#" + response).removeClass("valid-feedback").addClass("invalid-feedback").html("Please enter more than 2 characters");

    } else if(/[a-z]/.test(eval(scope)) && /[A-Z]/.test(eval(scope)) && /[0-9]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) {

        $("#" + input).removeClass("is-invalid").addClass("is-valid");
        $("#" + response).removeClass("invalid-feedback text-warning").addClass("valid-feedback").html("Strong password");

        result = true;

    } else if((/[A-Z]/.test(eval(scope)) && /[0-9]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)) && /[0-9]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)) && /[A-Z]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)) && /[A-Z]/.test(eval(scope)) && /[0-9]/.test(eval(scope)))) {

        $("#" + input).removeClass("is-invalid").addClass("is-valid");
        $("#" + response).removeClass("invalid-feedback text-warning").addClass("valid-feedback").html("Secured password");

        result = true;

    } else if((/[0-9]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[A-Z]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[A-Z]/.test(eval(scope)) && /[0-9]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)) && /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)) && /[0-9]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)) && /[A-Z]/.test(eval(scope)))) {

        $("#" + input).removeClass("is-invalid").addClass("is-valid");
        $("#" + response).removeClass("invalid-feedback").addClass("valid-feedback text-warning").html("Medium password");

        result = true;

    } else if((/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(eval(scope))) || (/[0-9]/.test(eval(scope))) || (/[A-Z]/.test(eval(scope))) || (/[a-z]/.test(eval(scope)))) {

        $("#" + input).removeClass("is-invalid").addClass("is-valid");
        $("#" + response).removeClass("invalid-feedback").addClass("valid-feedback text-warning").html("Low password");

        result = true;

    } else {

        result = true;

    }

    return result;

}

checkFormPasswordConfirm = function(scope, scopeConfirm, input, response) {

    let result = false;

    if(eval(scopeConfirm) != eval(scope)) {

        $("#" + input).removeClass("is-valid").addClass("is-invalid");
        $("#" + response).removeClass("valid-feedback").addClass("invalid-feedback").html("Password doesn't match");

    } else {

        $("#" + input).removeClass("is-invalid").addClass("is-valid");
        $("#" + response).removeClass("invalid-feedback").addClass("valid-feedback").html("Look's good");

        result = true;

    }

    return result;

}

}


