import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from 'firebase/auth';
import {  signOut, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) { }
  provider = new GoogleAuthProvider();

  Firestore = inject(Firestore);
  auth: Auth = inject(Auth);

  user$ = user(this.auth);
  signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        console.log(user)
        console.log("login successfully");
        this.router.navigateByUrl("home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
    }
      logout(){
        signOut(this.auth).then(() => {
          this.router.navigate(['/'])
          console.log('signed out');
        }).catch((error) => {
          console.log('sign out error: ' + error);
        })
      }
  }
  
 

  
  



