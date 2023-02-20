import { TestBed } from '@angular/core/testing';

import { ShareRegistrationDataService } from './share-registration-data.service';

describe('ShareRegistrationDataService', () => {
  let service: ShareRegistrationDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareRegistrationDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
