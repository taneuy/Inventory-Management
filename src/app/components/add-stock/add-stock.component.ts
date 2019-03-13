import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap, finalize } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product.bean';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  mProduct:Product = new Product();
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isUploaded:boolean = false;
  task: AngularFireUploadTask;
  key:string;
  mLastImageName:string;
  qty: number;
  categories: Observable<any[]>;
  constructor(
              private activeRoute:ActivatedRoute,
              private location:Location,
              private db: AngularFireDatabase, 
              private storage: AngularFireStorage) { 
                this.categories = db.list('/category', ref => ref.orderByChild('name')).snapshotChanges();
              }

  ngOnInit() {

    this.activeRoute.params.subscribe(params=>{     
      this.key = params["key"];
      var itemRef = this.db.object('stock/' + this.key).valueChanges().subscribe(item=>{
        console.log(JSON.stringify(item));
        
        this.mProduct.category = item["category"];
        this.mProduct.barcode = item["barcode"];
        this.mProduct.name = item["name"];
        this.mProduct.brand = item["brand"];
        this.mProduct.package = item["package"];
        this.mProduct.cost = item["cost"];
        this.mProduct.priceperunit = item["priceperunit"];
        this.mProduct.qty = item["qty"];
        this.mProduct.imageUrl = item["imageUrl"];
        this.mProduct.imageName = item["imageName"];
        this.mLastImageName = this.mProduct.imageName;
        console.log(this.key);
      });
    })
  }

  onClickSubmit(){
    this.mProduct.qty=this.mProduct.qty+this.qty;
    console.log(this.mProduct.qty)
    console.log(JSON.stringify(this.mProduct));
    var itemRef = this.db.list('stock');
      console.log(this.mProduct);
      console.log(this.key);
    itemRef.update(this.key, this.mProduct);


    this.location.back();
    }


  onClickCancel(){
    this.location.back();
  }
}
