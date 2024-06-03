import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Admin_dashboardComponent } from './admin_dashboard.component';

describe('DashboardComponent', () => {
  let component: Admin_dashboardComponent;
  let fixture: ComponentFixture<Admin_dashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Admin_dashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Admin_dashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
