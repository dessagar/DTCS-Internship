import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmsContentComponent } from './pms-content.component';

describe('PmsContentComponent', () => {
  let component: PmsContentComponent;
  let fixture: ComponentFixture<PmsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
