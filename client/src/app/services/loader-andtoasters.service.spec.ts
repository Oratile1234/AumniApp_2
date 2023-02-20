import { TestBed } from '@angular/core/testing';

import { LoaderANDToastersService } from './loader-andtoasters.service';

describe('LoaderANDToastersService', () => {
  let service: LoaderANDToastersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderANDToastersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
