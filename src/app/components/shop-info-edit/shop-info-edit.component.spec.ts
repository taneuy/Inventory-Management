import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInfoEditComponent } from './shop-info-edit.component';

describe('ShopInfoEditComponent', () => {
  let component: ShopInfoEditComponent;
  let fixture: ComponentFixture<ShopInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
