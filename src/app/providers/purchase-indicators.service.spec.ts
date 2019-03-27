import { TestBed } from '@angular/core/testing';

import { PurchaseIndicatorsService } from './purchase-indicators.service';

describe('PurchaseIndicatorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaseIndicatorsService = TestBed.get(PurchaseIndicatorsService);
    expect(service).toBeTruthy();
  });
});
