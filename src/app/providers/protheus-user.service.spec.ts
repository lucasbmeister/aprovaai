import { TestBed } from '@angular/core/testing';

import { ProtheusUserService } from './protheus-user.service';

describe('ProtheusUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProtheusUserService = TestBed.get(ProtheusUserService);
    expect(service).toBeTruthy();
  });
});
