import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Subject } from 'rxjs/Subject'
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { Product } from '../model/product.bean';

@Component({
  selector: 'app-user-all',
  templateUrl: './user-all.component.html',
  styleUrls: ['./user-all.component.css']
})
export class UserAllComponent implements OnInit {

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
    this.items = db.list('/users').snapshotChanges();
    this.items.subscribe(user => console.log(user))
  }

  ngOnInit() {
  
  }

  onClickDelete(item) {
    console.log("key:" + JSON.stringify(item));
    let itemRef = this.db.list('users');
    itemRef.remove(item.key);
    console.log("deleted");
  }

}
