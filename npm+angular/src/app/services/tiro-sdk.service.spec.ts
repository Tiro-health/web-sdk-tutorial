import { TestBed } from '@angular/core/testing';

import { TiroSdkService } from './tiro-sdk.service';

describe('TiroSdkService', () => {
  let service: TiroSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiroSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});