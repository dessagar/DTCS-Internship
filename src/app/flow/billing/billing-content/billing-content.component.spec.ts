import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingContentComponent } from './billing-content.component';

describe('BillingContentComponent', () => {
  let component: BillingContentComponent;
  let fixture: ComponentFixture<BillingContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillingContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
