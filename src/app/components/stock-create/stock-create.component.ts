import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Product } from '../model/product.bean';
import { Router, RouterLink } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  mProduct:Product = new Product();
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isUploaded:boolean = false;
  url:string;

  task: AngularFireUploadTask;
  categories: Observable<any[]>;

  constructor(private location:Location,
              private db: AngularFireDatabase, 
              private storage: AngularFireStorage,
              private router: Router,
              private saleService: SaleService) {
                this.categories = db.list('/category', ref => ref.orderByChild('name')).snapshotChanges();
               }

  ngOnInit() {
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
     await this.geturl();
    console.log(JSON.stringify(this.mProduct));
    await this.saleService.createProduct(this.mProduct);
    
  }
  onClickCancel(){
    this.location.back();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `stock/upload/${new Date().getTime()}_${file.name}`;
    this.mProduct.imageName = filePath;
    console.log(this.mProduct.imageName)
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
   )
  .subscribe()
  }
}
