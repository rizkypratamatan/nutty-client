import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteEntryComponent } from './website-entry.component';

describe('WebsiteEntryComponent', () => {
  let component: WebsiteEntryComponent;
  let fixture: ComponentFixture<WebsiteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebsiteEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
