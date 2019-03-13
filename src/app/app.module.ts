import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingComponent } from './components/setting/setting.component';
import { StockCreateComponent } from './components/stock-create/stock-create.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { StockComponent } from './components/stock/stock.component';
import { StockEditComponent } from './components/stock-edit/stock-edit.component';
import { CategoryComponent } from './components/category/category.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { AddStockComponent } from './components/add-stock/add-stock.component';
import { SaleComponent } from './components/pos/sale/sale.component';
import {MatCardModule} from '@angular/material/card';
import { CheckoutComponent } from './components/pos/checkout/checkout.component';
import { CartComponent } from './components/pos/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { StaffPageComponent } from './components/staff-page/staff-page.component';
import { MenuStaffComponent } from './components/menu-staff/menu-staff.component';
import { StockStaffComponent } from './components/stock-staff/stock-staff.component';
import { CartStaffComponent } from './components/posStaff/cart-staff/cart-staff.component';
import { CheckoutStaffComponent } from './components/posStaff/checkout-staff/checkout-staff.component';
import { SaleStaffComponent } from './components/posStaff/sale-staff/sale-staff.component';
import { RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { UserAllComponent } from './components/user-all/user-all.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import { ShopInfoEditComponent } from './components/shop-info-edit/shop-info-edit.component';

declare var require: any;

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    SettingComponent,
    StockCreateComponent,
    StockComponent,
    StockEditComponent,
    CategoryComponent,
    CategoryCreateComponent,
    CategoryEditComponent,
    AddStockComponent,
    SaleComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    AdminPageComponent,
    StaffPageComponent,
    MenuStaffComponent,
    StockStaffComponent,
    CartStaffComponent,
    CheckoutStaffComponent,
    SaleStaffComponent,
    UserAllComponent,
    UserAddComponent,
    ShopInfoComponent,
    ShopInfoEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,
    QRCodeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
