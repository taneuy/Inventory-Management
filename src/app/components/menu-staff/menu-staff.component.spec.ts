import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuStaffComponent } from './menu-staff.component';

describe('MenuStaffComponent', () => {
  let component: MenuStaffComponent;
  let fixture: ComponentFixture<MenuStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
