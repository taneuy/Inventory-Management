import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { Category } from '../model/category.bean';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {

  mCategory:Category = new Category();

  constructor(private location:Location,
              private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  onClickSubmit(){
    console.log(JSON.stringify(this.mCategory));
    let itemRef = this.db.list('category');
    itemRef.push(this.mCategory).then(()=>{
      this.location.back();
    });
    
  }

  onClickCancel(){
    this.location.back();
  }

}
