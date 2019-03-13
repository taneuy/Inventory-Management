import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Subject } from 'rxjs/Subject'
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../model/product.bean';

@Component({
  selector: 'app-stock-staff',
  templateUrl: './stock-staff.component.html',
  styleUrls: ['./stock-staff.component.css']
})
export class StockStaffComponent implements OnInit {

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
          ref => ref.orderByChild('barcode')
            .limitToFirst(10)            
            .startAt(q)
            .endAt(q + "\uf8ff"))  
          .snapshotChanges();
      }
    } else {
      this.items = this.db.list('/stock', ref => ref.orderByChild('barcode')).snapshotChanges();
    }
    this.lastKeypress = event.timeStamp
  }


  ngOnInit() {
    this.activeRoute.params.subscribe(params=>{     
      this.key = params["key"];
      var itemRef = this.db.object('stock/' + this.key).valueChanges().subscribe(item=>{
        console.log(JSON.stringify(item));

        console.log(this.key);
      });
    })
  }

  onClickAdd() {
    this.router.navigate(['stock_create']);
  }
  onClickAddQty(item){
    this.router.navigate(['stock_addQty', item.key]);
  }

}
