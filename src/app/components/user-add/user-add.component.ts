import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { SaleService } from 'src/app/services/sale.service';
import { User } from '../model/user.bean';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userC = {} as User

  constructor(private db: AngularFireDatabase,private userService: UserService, private location:Location) {

  }

  ngOnInit() {
  }

  async onClickSubmit(){
    var date = moment().format("YYYY-MM-DD-HH:mm:ss");

    this.userC.date = date;
    console.log(this.userC)
    await this.userService.emailSignUp(this.userC.email, this.userC.password)
      .then((auth) => {

        this.db.database.ref(`users/${this.userService.currentUserId}`).child("profile").set(this.userC);
        this.db.database.ref(`users/${this.userService.currentUserId}`).child("status").set("staff");
      });
  }
  onClickCancel(){
    this.location.back();
  }

  
}
