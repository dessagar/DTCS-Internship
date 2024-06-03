import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TileSubjectComponent } from './tile-subject.component';

describe('TileSubjectComponent', () => {
  let component: TileSubjectComponent;
  let fixture: ComponentFixture<TileSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TileSubjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TileSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
