import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorksheetStartComponent } from './worksheet-start.component';

describe('WorksheetStartComponent', () => {
  let component: WorksheetStartComponent;
  let fixture: ComponentFixture<WorksheetStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorksheetStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorksheetStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
