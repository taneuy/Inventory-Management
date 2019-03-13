import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireObject } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  authState: any = null;
  userRef: AngularFireObject<any>;
  constructor(private afAuth: AngularFireAuth) { 
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user

      })
      .catch((error) => {
        console.log(error);

      });
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }
}
