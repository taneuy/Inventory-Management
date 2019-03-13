import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Subject } from 'rxjs/Subject'
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../model/product.bean';

export interface DialogData {
  animal: string;
  name: string;
}


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})

export class StockComponent implements OnInit {

  items: Observable<any[]>;
  mProduct:Product = new Product();
  key:any;
name :string;
addQty:number;
  storage: any;
  constructor(private router: Router,               
    private activeRoute:ActivatedRoute,
    private db: AngularFireDatabase, 
     storage: AngularFireStorage ,
     public dialog: MatDialog) {
    this.items = db.list('/stock', ref => ref.orderByChild('name')).snapshotChanges();
  }

  lastKeypress: number = 0;
  onSearch(event) {
    let q = event.target.value
    if (q != "") {
      if ((event.timeStamp - this.lastKeypress) > 300) {
        this.items = this.db.list('/stock',
          ref => ref.orderByChild('name')
            .limitToFirst(10)            
            .startAt(q)
            .endAt(q + "\uf8ff"))  
          .snapshotChanges();
      }
    } else {
      this.items = this.db.list('/stock', ref => ref.orderByChild('name')).snapshotChanges();
    }
    this.lastKeypress = event.timeStamp
  }


  ngOnInit() {
  
  }

  onClickDelete(item) {
    console.log("key:" + JSON.stringify(item));
    let itemRef = this.db.list('stock');
    itemRef.remove(item.key);
    var desertRef = this.storage.ref(item.payload.val().imageName);

    desertRef.delete().subscribe(() => {
      console.log("deleted");
    })
    console.log("deleted");
  }

  onClickEdit(item) {
    this.router.navigate(['stock_edit', item.key]);
  }

  onClickAdd() {
    this.router.navigate(['stock_create']);
  }
  onClickAddQty(item){
    this.router.navigate(['stock_addQty', item.key]);
  }
}
