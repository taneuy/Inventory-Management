import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Product } from '../../model/product.bean';
import { SaleService } from 'src/app/services/sale.service';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

export class Fi {
  bar: string;
}

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  itemRef: AngularFireList<any>
  items: Observable<any>;
  mProduct:Product = new Product();

  d: Observable<any>;
 
// fi:Fi = new Fi();
fi:string;
  key:any;
  order: [];
  new: {};
  totOrders = 0;
  itemSelect: any;
  findRef: AngularFireObject<any>;
  find:Observable<any>;
barcode:string;

  constructor(private router: Router,               
    private activeRoute:ActivatedRoute,
    private db: AngularFireDatabase, 
     storage: AngularFireStorage ,
     private saleService: SaleService) {
       
       this.itemRef = this.db.list('stock');
       this.items = this.itemRef.snapshotChanges();
       this.items.subscribe(data => {
        // console.log(data)
       })
       

    // this.items = db.list('/stock').snapshotChanges();
  }

  ngOnInit() {}

  lastKeypress: number = 0;
  onSearch(event) {
    let q = event.target.value
    
    if (q != "") {
      if ((event.timeStamp - this.lastKeypress) > 0) {
        this.items = this.db.list('/stock',
          ref => ref.orderByChild('barcode')
            .limitToFirst(5)            
            .startAt(q)
            .endAt(q + "\uf8ff"))  
          .snapshotChanges();
      }
      console.log(q)
      this.d = this.db.list('stock').valueChanges();
      this.d.pipe(take(1)).subscribe(d => {
        console.log(d.some(e => e.barcode == q));
        var check = d.some(e => e.barcode == q);
        switch(check){
          case true:{
            console.log("trues")
            break;
          }
          default:{
            console.log("ff")
          }
        }
        // while(d.some(e => e.barcode == q) == true)
        // {
          
        //   console.log("not break")
        //   break;

        // }

        
      })
      // this.db.list('stock', ref => ref.orderByChild('barcode').equalTo(q)).snapshotChanges().pipe(take(1)).subscribe(actions =>{
      //   actions.forEach(action => {
      //     // console.log(action.key);
      //     // console.log("-----")
      //     this.findRef = this.db.object(`stock/${action.key}`);
      //     this.find = this.findRef.snapshotChanges();
      //     this.find.pipe(take(1)).subscribe(data => {
      //       // console.log(data)
      //       this.addToCart(data);
      //     });
      //   })
      // })

    } else {
      this.items = this.db.list('/stock').snapshotChanges();

    }
    this.lastKeypress = event.timeStamp
  }

  addToCart(itemSelect) {
   this.saleService.addToCart(itemSelect);
  }
  
  async cart(){
    await this.router.navigate(['/cart'])
  }
  clearcart(){
    localStorage.clear();
    location.reload();
    console.log(localStorage.getItem('avct_item'))
  }

  add(q){
          this.db.list('stock', ref => ref.orderByChild('barcode').equalTo(q)).snapshotChanges().pipe(take(1)).subscribe(actions =>{
        actions.forEach(action => {
          // console.log(action.key);
          // console.log("-----")
          this.findRef = this.db.object(`stock/${action.key}`);
          this.find = this.findRef.snapshotChanges();
          this.find.pipe(take(1)).subscribe(data => {
            // console.log(data)
            this.addToCart(data);
          });
        })
      })
  }

  onSearch2(fi){
    this.d = this.db.list('stock').valueChanges();
      this.d.pipe(take(1)).subscribe(d => {
        console.log(d.some(e => e.barcode == fi));
        var check = d.some(e => e.barcode == fi);
        if(check == true){
          this.db.list('stock', ref => ref.orderByChild('barcode').equalTo(fi)).snapshotChanges().pipe(take(1)).subscribe(actions =>{
      actions.forEach(action => {
        // console.log(action.key);
        // console.log("-----")
        this.findRef = this.db.object(`stock/${action.key}`);
        this.find = this.findRef.snapshotChanges();
        this.find.pipe(take(1)).subscribe(data => {
          // console.log(data)
          this.addToCart(data);
        });
      })
    })
        }
        // switch(check){
        //   case true:{
        //     console.log("trues")
        //     break;
        //   }
        //   case false:{
        //     console.log("false");
        //   }
        //   default:{
        //     console.log("default")
        //   }
        // }
      });

    // this.db.list('stock', ref => ref.orderByChild('barcode').equalTo(fi)).snapshotChanges().pipe(take(1)).subscribe(actions =>{
    //   actions.forEach(action => {
    //     // console.log(action.key);
    //     // console.log("-----")
    //     this.findRef = this.db.object(`stock/${action.key}`);
    //     this.find = this.findRef.snapshotChanges();
    //     this.find.pipe(take(1)).subscribe(data => {
    //       // console.log(data)
    //       this.addToCart(data);
    //     });
    //   })
    // })

  }
  

}
