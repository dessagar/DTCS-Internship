import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareFlowComponent } from './care-flow.component';

describe('CareFlowComponent', () => {
  let component: CareFlowComponent;
  let fixture: ComponentFixture<CareFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
