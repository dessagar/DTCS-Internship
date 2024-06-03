import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareContentComponent } from './care-content.component';

describe('CareContentComponent', () => {
  let component: CareContentComponent;
  let fixture: ComponentFixture<CareContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
