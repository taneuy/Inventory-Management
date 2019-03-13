import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockCreateComponent } from './components/stock-create/stock-create.component';
import { StockComponent } from './components/stock/stock.component';
import { StockEditComponent } from './components/stock-edit/stock-edit.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { AddStockComponent } from './components/add-stock/add-stock.component';
import { SaleComponent } from './components/pos/sale/sale.component';
import { CheckoutComponent } from './components/pos/checkout/checkout.component';
import { CartComponent } from './components/pos/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { StaffPageComponent } from './components/staff-page/staff-page.component';
import { SaleStaffComponent } from './components/posStaff/sale-staff/sale-staff.component';
import { CartStaffComponent } from './components/posStaff/cart-staff/cart-staff.component';
import { CheckoutStaffComponent } from './components/posStaff/checkout-staff/checkout-staff.component';
import { StockStaffComponent } from './components/stock-staff/stock-staff.component';
import { UserAllComponent } from './components/user-all/user-all.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { ShopInfoEditComponent } from './components/shop-info-edit/shop-info-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  { path: 'stock', component: StockComponent } ,
  { path: 'stock_create', component: StockCreateComponent },
  { path: 'stock_edit/:key', component: StockEditComponent },
  { path: 'category', component: CategoryComponent } ,
  { path: 'category_create', component: CategoryCreateComponent },
  { path: 'category_edit/:key', component: CategoryEditComponent },
  { path: 'stock_addQty/:key', component: AddStockComponent },
  { path: 'sale', component: SaleComponent},
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'login', component: LoginComponent},
  { path: 'adminPage', component: AdminPageComponent},
  { path: 'staffPage', component: StaffPageComponent},
  { path: 'sales', component: SaleStaffComponent},
  { path: 'carts', component: CartStaffComponent},
  { path: 'checkouts', component: CheckoutStaffComponent},
  { path: 'stocks', component: StockStaffComponent},
  { path: 'allusers', component: UserAllComponent},
  { path: 'addusers', component: UserAddComponent},
  { path: 'shop-info', component: ShopInfoComponent},
  { path: 'shop-info-edit', component: ShopInfoEditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    { enableTracing: false , onSameUrlNavigation: `reload`} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
