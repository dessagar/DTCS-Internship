import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocopContentComponent } from './docop-content.component';

describe('DocopContentComponent', () => {
  let component: DocopContentComponent;
  let fixture: ComponentFixture<DocopContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocopContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocopContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
