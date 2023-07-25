import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLicenseComponent } from './add-edit.component';

describe('AddEditComponent', () => {
  let component: AddEditLicenseComponent;
  let fixture: ComponentFixture<AddEditLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditLicenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
