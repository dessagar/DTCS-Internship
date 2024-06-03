import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsliderComponent } from './newslider.component';

describe('NewsliderComponent', () => {
  let component: NewsliderComponent;
  let fixture: ComponentFixture<NewsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
