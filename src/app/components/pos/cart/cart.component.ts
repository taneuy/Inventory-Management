import { Component, OnInit, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Product } from '../../model/product.bean';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { SaleService } from 'src/app/services/sale.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any;
  itemselect: Observable<any[]>;
  mProduct:Product = new Product();
  totalValue = 0;
  price : number;
  totalQty : number;
  key:string;
  qty: any;
  qtyy: Observable<any>;
  qtyref: AngularFireObject<any>;
  decrease: number;
  ttqty:number;
  id: any;
  constructor(private saleService: SaleService,private db: AngularFireDatabase,private router: Router) {

  }

	ngOnChanges(changes: SimpleChanges) {
		const dataChanges: SimpleChange = changes.products;
    const products: Product[] = dataChanges.currentValue;

		this.totalValue = 0;
		products.forEach((product) => {
			this.totalValue += this.products.priceperunit;
		});
	}


  async ngOnInit() {
     this.products = await this.saleService.getLocalCartProducts();
    console.log(this.products);  
    this.totalValue = 0;
		await this.products.forEach((product) => {
      this.totalValue += product.payload.priceperunit;
		});
  }

  async checkout(){

		var date = moment().format("YYYY-MM-DD-HH:mm:ss");
		var y =[];
		const products = JSON.parse(localStorage.getItem('avct_item')) || [];
		console.log(products)
      await this.saleService.setPriceInCart(products,this.totalValue);

    
    // var cart = this.db.list(`cart/${date}/item`).valueChanges();
    // cart.subscribe(async data => {
    //   console.log(data);
      
    //   for(var i=0; i < data.length; i++){
    //     console.log(data[i])
        
    //     this.saleService.stock_update(data[i]);
    //   }

    // })
    this.router.navigate(['/checkout'])

  }
reload(){
  location.reload();
}
  clearcart(){
    localStorage.clear();
    location.reload();
    console.log(localStorage.getItem('avct_item'))
  }
}
