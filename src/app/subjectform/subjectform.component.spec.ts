import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectformComponent } from './subjectform.component';

describe('SubjectformComponent', () => {
  let component: SubjectformComponent;
  let fixture: ComponentFixture<SubjectformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
