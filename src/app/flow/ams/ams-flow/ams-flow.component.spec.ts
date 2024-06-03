import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmsFlowComponent } from './ams-flow.component';

describe('AmsFlowComponent', () => {
  let component: AmsFlowComponent;
  let fixture: ComponentFixture<AmsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmsFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
