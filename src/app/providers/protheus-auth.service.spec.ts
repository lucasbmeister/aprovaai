import { TestBed } from '@angular/core/testing';

import { ProtheusAuthService } from './protheus-auth.service';

describe('ProtheusAuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProtheusAuthService = TestBed.get(ProtheusAuthService);
    expect(service).toBeTruthy();
  });
});
