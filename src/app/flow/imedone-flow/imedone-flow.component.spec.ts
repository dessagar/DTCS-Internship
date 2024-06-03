import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImedoneFlowComponent } from './imedone-flow.component';

describe('ImedoneFlowComponent', () => {
  let component: ImedoneFlowComponent;
  let fixture: ComponentFixture<ImedoneFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImedoneFlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImedoneFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
