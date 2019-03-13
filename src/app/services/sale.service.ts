import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Product } from '../components/model/product.bean';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
itemQty:any;
  products: AngularFireList<Product>;
	product: AngularFireObject<Product>;
keys: string;
  navbarCartCount = 0;
	downloadURL: Observable<string>;
	isUploaded:boolean = false;
	mProduct:Product = new Product();
	qtyref: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,
   ) { 
    this.calculateLocalCartProdCounts();
    
  }

  getProducts() {
		this.products = this.db.list('products');
		return this.products;
	}

	createProduct(mProduct: Product) {
		let itemRef = this.db.list('stock');
		itemRef.push(mProduct);
	}

	getProductById(key: string) {
		this.product = this.db.object('stock/' + key);
		return this.product;
	}

	// updateProduct(data: Product) {
	// 	this.products.update(data.$key, data);
	// }


  
  deleteProduct(key: string) {
		this.products.remove(key);
  }

  	/*
   ----------  Cart Product Function  ----------
  */

	// Adding new Product to cart db if logged in else localStorage
 	addToCart(data: Product) {
		let a: Product[];

		a = JSON.parse(localStorage.getItem('avct_item')) || [];

		a.push(data);
		console.log(a)
			localStorage.setItem('avct_item', JSON.stringify(a));
			this.calculateLocalCartProdCounts();

	}


	// Removing cart from local
	// removeLocalCartProduct(product: Product) {
	// 	const products: Product[] = JSON.parse(localStorage.getItem('avct_item'));

	// 	for (let i = 0; i < products.length; i++) {
	// 		if (products[i].productId === product.productId) {
	// 			products.splice(i, 1);
	// 			break;
	// 		}
	// 	}
	// 	// ReAdding the products after remove
	// 	localStorage.setItem('avct_item', JSON.stringify(products));

	// 	this.calculateLocalCartProdCounts();
	// }

	// Fetching Locat CartsProducts
	getLocalCartProducts(): Product[] {
		const products: Product[] = JSON.parse(localStorage.getItem('avct_item')) || [];

		return products;
	}

	// returning LocalCarts Product Count
	calculateLocalCartProdCounts() {
		this.navbarCartCount = this.getLocalCartProducts().length;
	}


	addCartTodb(){

		var date = moment().format("YYYY-MM-DD-HH-mm-ss");
		var y =[];
		const products = JSON.parse(localStorage.getItem('avct_item')) || [];
		console.log(products)
		for(var i=1; i < products.length ; i ++){
			console.log(products.length)
			y[i]=products[i].key;
		}
		var s = this.db.database.ref(`cart`).child(date).set(y);
	}

	setPriceInCart(products,totalValue){
		var date = moment().format("YYYY-MM-DD-HH:mm:ss");
		var y =[];
		for(var i=0; i < products.length ; i ++){
			console.log(products.length)
			y[i]=products[i].key;
		}
    var s = this.db.database.ref(`cart/${date}`).child("item").set(y);
    this.db.database.ref(`cart/${date}`).child("price").set(totalValue);
	}

	// async getqty(key){
	// 	console.log(key);
	// 	this.keys = key;
	//  	var itemRef = await this.db.object('stock/' + this.keys).valueChanges().subscribe(async item=>{
	// 		console.log(JSON.stringify(item));
			
	// 		console.log(this.totqty)

	// 	  });
	// 	//   this.db.object('stock/' + this.keys).update({ qty: this.totqty });

	// }
	async stock_update(item_id:any){
		console.log(item_id)
		 await this.finditem(item_id);

		// await this.qtyref.update(this.mProduct);
	}

async	finditem(item_id){
		this.qtyref = await this.db.object('stock/'+item_id)
					this.qtyref.valueChanges().subscribe( qty => {
				
				console.log(qty.qty-1)
		});
	}
}