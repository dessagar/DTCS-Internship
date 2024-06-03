import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcontentComponent } from './subcontent.component';

describe('SubcontentComponent', () => {
  let component: SubcontentComponent;
  let fixture: ComponentFixture<SubcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcontentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
