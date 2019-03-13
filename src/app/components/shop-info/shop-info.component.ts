import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { MatDialog } from '@angular/material';
import { Shopinfo } from '../model/shopinfo.bean';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.component.html',
  styleUrls: ['./shop-info.component.css']
})
export class ShopInfoComponent implements OnInit {
  // items: Observable<any[]>;
  info:Shopinfo = new Shopinfo();
  itemRef:any;
  constructor(private router: Router,               
    private activeRoute:ActivatedRoute,
    private db: AngularFireDatabase, 
     storage: AngularFireStorage ,
     public dialog: MatDialog) { 

     this.itemRef = this.db.object('shop/').valueChanges().subscribe(item=>{
        console.log(item)
        this.info.name = item["name"];
        this.info.email = item["email"];
        this.info.tel = item["tel"];
        this.info.address = item["address"];
        this.info.imageUrl = item["imageUrl"];
      })

  }

  ngOnInit() {
  }

}
