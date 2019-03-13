import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from "@angular/router";

import { Observable } from 'rxjs';
import { User } from '../model/user.bean';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {} as User

  users: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private router:Router,
  ) { }

  ngOnInit() {
    console.log('login page');
    this.db.object('users/').valueChanges().subscribe(data => {
      console.log(data);
    })
  }

  login(user: User){
    try{
      this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password).then((res) => {
        this.db.database.ref(`users/${res.user.uid}/profile`).update({token:res.user.refreshToken});

        var status = this.db.object(`users/${res.user.uid}/status`).valueChanges();
        status.subscribe(data => {
          console.log(data);
          if(data == "admin"){
            this.router.navigate(['adminPage']);
          }else if (data == "staff"){
            this.router.navigate(['staffPage']);
          }
        });
      }).catch(error => {
        console.log(error);
      });
    }catch(e){
      console.log(e);
    }
  }
}
