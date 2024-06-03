import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrmFlowComponent } from './grm-flow.component';

describe('GrmFlowComponent', () => {
  let component: GrmFlowComponent;
  let fixture: ComponentFixture<GrmFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrmFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrmFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
