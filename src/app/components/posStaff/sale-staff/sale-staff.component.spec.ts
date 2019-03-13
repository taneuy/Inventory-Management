import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleStaffComponent } from './sale-staff.component';

describe('SaleStaffComponent', () => {
  let component: SaleStaffComponent;
  let fixture: ComponentFixture<SaleStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaleStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
