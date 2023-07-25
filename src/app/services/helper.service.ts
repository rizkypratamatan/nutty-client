import { Injectable } from '@angular/core';
import { ConfigurationService } from 'src/app/configurations/configuration.service';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  public configuration: ConfigurationService;

    accountData: string;
    auth: [];

    constructor(
        private configurationService: ConfigurationService,
    ) {
        this.configuration = this.configurationService;
    }

    public initializeDate(timestamp){
      let date = new Date();
        date.setTime(timestamp);

        return date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
    }

    public initializeTimestamp(timestamp) {

      let date = new Date();
      date.setTime(timestamp);
  
      return ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2);
  
    }

    public hidePhone(data){
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

    
}
