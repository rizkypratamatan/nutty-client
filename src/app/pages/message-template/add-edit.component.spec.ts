import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMessageTemplateComponent } from './add-edit.component';

describe('AddEditComponent', () => {
  let component: AddEditMessageTemplateComponent;
  let fixture: ComponentFixture<AddEditMessageTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMessageTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMessageTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
