import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsFlowComponent } from './pms-flow.component';

describe('PmsFlowComponent', () => {
  let component: PmsFlowComponent;
  let fixture: ComponentFixture<PmsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
