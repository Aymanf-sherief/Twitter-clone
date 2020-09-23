import { TestBed } from '@angular/core/testing';

import { ApiCleintService } from './api-cleint.service';

describe('ApiCleintService', () => {
  let service: ApiCleintService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCleintService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
