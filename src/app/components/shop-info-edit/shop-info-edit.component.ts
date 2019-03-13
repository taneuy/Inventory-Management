import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { MatDialog } from '@angular/material';
import { Shopinfo } from '../model/shopinfo.bean';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-shop-info-edit',
  templateUrl: './shop-info-edit.component.html',
  styleUrls: ['./shop-info-edit.component.css']
})
export class ShopInfoEditComponent implements OnInit {
  info:Shopinfo = new Shopinfo();
  itemRef:any;

  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isUploaded:boolean = false;
  url:string;

  task: AngularFireUploadTask;
  
  constructor(private router: Router,               
    private activeRoute:ActivatedRoute,
    private db: AngularFireDatabase, 
     private storage: AngularFireStorage ,
     public dialog: MatDialog,
     private location:Location,
     ) { 

     this.itemRef = this.db.object('shop/').valueChanges().subscribe(item=>{
        console.log(item)
        this.info.name = item["name"];
        this.info.email = item["email"];
        this.info.tel = item["tel"];
        this.info.address = item["address"];
        this.info.imageUrl = item["imageUrl"];
        this.info.imageName = item["imageName"];
      })

  }

  ngOnInit() {
  }

  async onClickSubmit(){
    // await this.geturl();
    await this.geturl();
    console.log(JSON.stringify(this.info));
    var itemRef = this.db.object('shop');
    itemRef.update(this.info);


    // if (this.mLastImageName != this.mProduct.imageName){
    //   // Delete old image file
    //   var desertRef = this.storage.ref(this.mLastImageName);
    //   desertRef.delete().subscribe(()=>{
    //     console.log("deleted old image file");
    //   })
    // }


    this.location.back();

  }
  async geturl(){
    console.log(`"imageUrl" : ${this.info.imageUrl}`)
    await this.downloadURL.subscribe((url)=>{
      console.log(url);
      this.info.imageUrl = url.toString();
      this.isUploaded = true;
      console.log(`"imageUrl" : ${this.info.imageUrl}`)
    })
  }
  onClickCancel(){
    this.location.back();
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `shop/info/${new Date().getTime()}_${file.name}`;
    this.info.imageName = filePath;
    console.log(this.info.imageName)
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(
      finalize(() => this.downloadURL = fileRef.getDownloadURL() )
   )
  .subscribe()
  }
}
