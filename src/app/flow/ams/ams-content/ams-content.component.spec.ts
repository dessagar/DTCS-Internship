import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmsContentComponent } from './ams-content.component';

describe('AmsContentComponent', () => {
  let component: AmsContentComponent;
  let fixture: ComponentFixture<AmsContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmsContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
