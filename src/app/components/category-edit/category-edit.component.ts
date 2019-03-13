import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../model/category.bean';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {

  mCategory:Category = new Category();
  task: AngularFireUploadTask;
  key:string;


  constructor(
              private activeRoute:ActivatedRoute,
              private location:Location,
              private db: AngularFireDatabase, 
              private storage: AngularFireStorage) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(params=>{     
      this.key = params["key"];
      var itemRef = this.db.object('category/' + this.key).valueChanges().subscribe(item=>{
        console.log(JSON.stringify(item));
        
        this.mCategory.name = item["name"];

      });
    })
  }

  onClickSubmit(){
    console.log(JSON.stringify(this.mCategory));
    var itemRef = this.db.list('category');
    itemRef.update(this.key, this.mCategory);
    this.location.back();
  }

  onClickCancel(){
    this.location.back();
  }

}
