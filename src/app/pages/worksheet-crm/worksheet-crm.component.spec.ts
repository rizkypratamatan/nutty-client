import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetCrmComponent } from './worksheet-crm.component';

describe('WorksheetCrmComponent', () => {
  let component: WorksheetCrmComponent;
  let fixture: ComponentFixture<WorksheetCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksheetCrmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
