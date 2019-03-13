import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStaffComponent } from './stock-staff.component';

describe('StockStaffComponent', () => {
  let component: StockStaffComponent;
  let fixture: ComponentFixture<StockStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
