import { Component, OnInit, SimpleChanges, SimpleChange } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.bean';
import { Router } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import * as promptpay from 'promptpay-qr';
import { Shopinfo } from '../../model/shopinfo.bean';
declare const require: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  info:Shopinfo = new Shopinfo();
  itemRef:any;
  products: any;
  itemselect: Observable<any[]>;
  mProduct:Product = new Product();
  totalValue = 0;
  price : number;
  lastcart: any;
  item: [];
  key: string;
  payload:any;
  myAngularxQrCode:any;
  constructor(private saleService: SaleService,private db: AngularFireDatabase,private router: Router) {
    this.itemselect = db.list('/stock', ref => ref.orderByChild('name')).snapshotChanges();
  }

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.products;
    const products: Product[] = dataChanges.currentValue;

		this.totalValue = 0;
		products.forEach((product) => {
			this.totalValue += this.products.payload.priceperunit;
		});
	}


  ngOnInit() {
    this.products = this.saleService.getLocalCartProducts();
    console.log(this.products);
    this.totalValue = 0;
		this.products.forEach((product) => {
      this.totalValue += product.payload.priceperunit;
    });
    this.itemRef = this.db.object('shop/').valueChanges().subscribe(item=>{
      console.log(item)
      this.info.name = item["name"];
      this.info.email = item["email"];
      this.info.tel = item["tel"];
      this.info.address = item["address"];
      this.info.imageUrl = item["imageUrl"];
    })

    const generatePayload = require('promptpay-qr');

    const mobileNumber = '097-198-2024';
    const amount = this.totalValue;
    this.payload = generatePayload(mobileNumber, { amount });
    console.log(this.payload)
    this.myAngularxQrCode = this.payload;


    localStorage.clear();
  }
  home(){
    this.router.navigate(['/sale'])
  }
}
