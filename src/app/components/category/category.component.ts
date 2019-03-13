import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage';
import { Subject } from 'rxjs/Subject'


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  items: Observable<any[]>;

  constructor(private router: Router, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.items = db.list('/category', ref => ref.orderByChild('name')).snapshotChanges();
  }

  lastKeypress: number = 0;
  onSearch(event) {
    let q = event.target.value
    if (q != "") {
      if ((event.timeStamp - this.lastKeypress) > 300) {
        this.items = this.db.list('/category',
          ref => ref.orderByChild('name')
            .limitToFirst(10)            
            .startAt(q)
            .endAt(q + "\uf8ff"))
          .snapshotChanges();
      }
    } else {
      this.items = this.db.list('/category', ref => ref.orderByChild('name')).snapshotChanges();
    }
    this.lastKeypress = event.timeStamp
  }


  ngOnInit() {
  }

  onClickDelete(item) {
    console.log("key:" + JSON.stringify(item));
    let itemRef = this.db.list('category');
    itemRef.remove(item.key);
    // var desertRef = this.storage.ref(item.payload.val().imageName);

    // desertRef.delete().subscribe(() => {
    //   console.log("deleted");
    // })
    console.log("deleted");
  }

  onClickEdit(item) {
    this.router.navigate(['category_edit', item.key]);
  }

  onClickAdd() {
    this.router.navigate(['category_create']);
  }

}
