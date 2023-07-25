import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SMSBulkComponent } from './bulk.component';

describe('BulkComponent', () => {
  let component: SMSBulkComponent;
  let fixture: ComponentFixture<SMSBulkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SMSBulkComponent]
    });
    fixture = TestBed.createComponent(SMSBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
