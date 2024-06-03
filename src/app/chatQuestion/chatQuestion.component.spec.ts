import { ComponentFixture, TestBed } from '@angular/core/testing';

import { chatQuestionComponent } from './chatQuestion.component';

describe('AskmeComponent', () => {
  let component: chatQuestionComponent;
  let fixture: ComponentFixture<chatQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ chatQuestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(chatQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
