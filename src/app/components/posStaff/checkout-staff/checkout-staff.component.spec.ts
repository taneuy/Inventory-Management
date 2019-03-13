import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStaffComponent } from './checkout-staff.component';

describe('CheckoutStaffComponent', () => {
  let component: CheckoutStaffComponent;
  let fixture: ComponentFixture<CheckoutStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
