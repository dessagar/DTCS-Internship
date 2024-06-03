import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubtopicComponent } from './admin-subtopic.component';

describe('AdminSubtopicComponent', () => {
  let component: AdminSubtopicComponent;
  let fixture: ComponentFixture<AdminSubtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubtopicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSubtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
