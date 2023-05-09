import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGroupEntryComponent } from './user-group-entry.component';

describe('UserGroupEntryComponent', () => {
  let component: UserGroupEntryComponent;
  let fixture: ComponentFixture<UserGroupEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGroupEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGroupEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
