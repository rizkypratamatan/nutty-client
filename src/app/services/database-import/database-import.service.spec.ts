import { TestBed } from '@angular/core/testing';

import { DatabaseImportService } from './database-import.service';

describe('DatabaseImportService', () => {
  let service: DatabaseImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
