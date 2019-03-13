import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartStaffComponent } from './cart-staff.component';

describe('CartStaffComponent', () => {
  let component: CartStaffComponent;
  let fixture: ComponentFixture<CartStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
