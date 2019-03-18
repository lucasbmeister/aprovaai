import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPurchasePage } from './pending-purchase.page';

describe('PendingPurchasePage', () => {
  let component: PendingPurchasePage;
  let fixture: ComponentFixture<PendingPurchasePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingPurchasePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
