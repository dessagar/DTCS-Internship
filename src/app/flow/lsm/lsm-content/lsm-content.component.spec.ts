import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsmContentComponent } from './lsm-content.component';

describe('LsmContentComponent', () => {
  let component: LsmContentComponent;
  let fixture: ComponentFixture<LsmContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsmContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LsmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
