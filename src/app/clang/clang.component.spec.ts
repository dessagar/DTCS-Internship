import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClangComponent } from './clang.component';

describe('ClangComponent', () => {
  let component: ClangComponent;
  let fixture: ComponentFixture<ClangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
