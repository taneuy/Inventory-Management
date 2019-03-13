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
  selector: 'app-stock-edit',
  templateUrl: './stock-edit.component.html',
  styleUrls: ['./stock-edit.component.css']
})

export class StockEditComponent implements OnInit {
  // constructor(){}
  // ngOnInit() {}
  mProduct:Product = new Product();
  uploadPercent: Observable<number>;
  
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isUploaded:boolean = false;
  task: AngularFireUploadTask;
  key:string;
  mLastImageName:string;
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
  async geturl(){
    console.log(`"imageUrl" : ${this.mProduct.imageUrl}`)
    await this.downloadURL.subscribe((url)=>{
      console.log(url);
      this.mProduct.imageUrl = url.toString();
      this.isUploaded = true;
      console.log(`"imageUrl" : ${this.mProduct.imageUrl}`)
    })
  }

  async onClickSubmit(){
    // await this.geturl();
    console.log(JSON.stringify(this.mProduct));
    var itemRef = this.db.list('stock');
    itemRef.update(this.key, this.mProduct);


    if (this.mLastImageName != this.mProduct.imageName){
      // Delete old image file
      var desertRef = this.storage.ref(this.mLastImageName);
      desertRef.delete().subscribe(()=>{
        console.log("deleted old image file");
      })
    }


    this.location.back();

  }

  onClickCancel(){
    this.location.back();
  }

  uploadFile(event) {
    const file = event.item(0)
    const filePath = `stock/upload/${new Date().getTime()}_${file.name}`;
    this.mProduct.imageName = filePath;
    console.log(this.mProduct.imageName)
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    console.log(this.uploadPercent)
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => this.downloadURL = fileRef.getDownloadURL() )
        )
    .subscribe()

  }

  // uploadFile(event) {
  //   // The File object
  //   const file = event.item(0)

  //   // Client-side validation example
  //   if (file.type.split('/')[0] !== 'image') {
  //     console.error('unsupported file type :( ')
  //     return;
  //   }

  //     const filePath = `stock/upload/${new Date().getTime()}_${file.name}`;
  //     this.mProduct.imageName = filePath;
  //     console.log(this.mProduct.imageName)
  //     const fileRef = this.storage.ref(filePath);
  //     const task = this.storage.upload(filePath, file);
  
  //     // observe percentage changes
  //     this.uploadPercent = task.percentageChanges();
  //     console.log(this.uploadPercent)
  //     // get notified when the download URL is available
  //     task.snapshotChanges().pipe(
  //         finalize(() => this.downloadURL = fileRef.getDownloadURL() 
  //      ) )
  //     .subscribe() 
  // }  
  
}
