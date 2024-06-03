import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocopFlowComponent } from './docop-flow.component';

describe('DocopFlowComponent', () => {
  let component: DocopFlowComponent;
  let fixture: ComponentFixture<DocopFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocopFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocopFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
