import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsmFlowComponent } from './lsm-flow.component';

describe('LsmFlowComponent', () => {
  let component: LsmFlowComponent;
  let fixture: ComponentFixture<LsmFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsmFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LsmFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
