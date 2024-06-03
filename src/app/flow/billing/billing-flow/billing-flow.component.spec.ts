import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingFlowComponent } from './billing-flow.component';

describe('BillingFlowComponent', () => {
  let component: BillingFlowComponent;
  let fixture: ComponentFixture<BillingFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
