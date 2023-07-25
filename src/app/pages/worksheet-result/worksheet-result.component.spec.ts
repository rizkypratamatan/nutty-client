import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetResultComponent } from './worksheet-result.component';

describe('WorksheetResultComponent', () => {
  let component: WorksheetResultComponent;
  let fixture: ComponentFixture<WorksheetResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksheetResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
