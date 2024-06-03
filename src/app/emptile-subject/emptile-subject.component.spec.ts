import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptileSubjectComponent } from './emptile-subject.component';

describe('EmptileSubjectComponent', () => {
  let component: EmptileSubjectComponent;
  let fixture: ComponentFixture<EmptileSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptileSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptileSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
