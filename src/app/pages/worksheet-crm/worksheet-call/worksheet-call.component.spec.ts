import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetCallComponent } from './worksheet-call.component';

describe('WorksheetCallComponent', () => {
  let component: WorksheetCallComponent;
  let fixture: ComponentFixture<WorksheetCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksheetCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
