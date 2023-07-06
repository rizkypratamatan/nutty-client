import { Component, OnInit } from '@angular/core';
import { FlatpickrOptions } from 'ng2-flatpickr';

@Component({
  selector: 'app-worksheet-result',
  templateUrl: './worksheet-result.component.html',
  styleUrls: ['./worksheet-result.component.scss']
})
export class WorksheetResultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  datePickerOption: FlatpickrOptions = {
    "dateFormat": "Y/m/d"
  }

}
