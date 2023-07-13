import { TestBed } from '@angular/core/testing';

import { WebsiteReportService } from './website-report.service';

describe('WebsiteReportService', () => {
  let service: WebsiteReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsiteReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
