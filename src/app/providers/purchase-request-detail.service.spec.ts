import { TestBed } from '@angular/core/testing';

import { PurchaseRequestDetailService } from './purchase-request-detail.service';

describe('PurchaseRequestDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseRequestDetailService = TestBed.get(PurchaseRequestDetailService);
    expect(service).toBeTruthy();
  });
});
