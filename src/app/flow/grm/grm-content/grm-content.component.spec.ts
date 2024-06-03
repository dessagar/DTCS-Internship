import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrmContentComponent } from './grm-content.component';

describe('GrmContentComponent', () => {
  let component: GrmContentComponent;
  let fixture: ComponentFixture<GrmContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrmContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrmContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
