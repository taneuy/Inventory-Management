import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,private router:Router) { }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }
}
