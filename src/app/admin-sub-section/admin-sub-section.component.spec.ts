import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubSectionComponent } from './admin-sub-section.component';

describe('AdminSubSectionComponent', () => {
  let component: AdminSubSectionComponent;
  let fixture: ComponentFixture<AdminSubSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
