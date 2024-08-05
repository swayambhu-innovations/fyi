import { inject, Injectable } from '@angular/core';
import { Auth, authState, getRedirectResult, signInWithRedirect } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  collection,
  documentId,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  provider = new GoogleAuthProvider();

  
  private _firestore = inject(Firestore);
  private _auth = inject(Auth);
  authState$ = authState(this._auth);
  user$: Observable<User | null> = user(this._auth);
  userDetails: any | null = null;
  showLoginIn = true;

  constructor(private router: Router) {
    this.user$.subscribe(async (user) => {
      if (user) {
        const validUser = await this.checkValidUser(user.email || '');

        if (!validUser) {
          this.showLoginIn = false;
          this.router.navigate(['notAdmin']);
          return;
        }
        this.userDetails = user;
        localStorage.setItem('userEmail', this.userDetails.email);
        localStorage.setItem('token', this.userDetails.accessToken);
        if (this.router.url === '/login') {
          this.router.navigate(['home']);
        }
      } else {
        this.userDetails = null;
        localStorage.removeItem('token');
      }
    });
  }

  async checkValidUser(email: string) {
    const chkUser = await this.getUserData(email);
    let isActiveUser = false;
    chkUser.docs.map((user) => {
      if (user.data()['active']) {
        isActiveUser = true;
      }
      return user;
    });
    return isActiveUser;
  }

  async googleSignin() {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(this._auth, provider);

  }

  async signout() {
    await signOut(this._auth);
    localStorage.removeItem('token');
    this.showLoginIn = true;
    return this.router.navigate(['login']);
  }
  private getUserData(email: any) {
    return getDocs(
      query(
        collection(this._firestore, 'admin'),
        where(documentId(), '==', email)
      )
    );
  }

  async handleRedirectResult() {
    const auth = getAuth();
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      console.log('User:', user);
      // Save user data or perform other actions
    }
  } catch (error) {
    console.error('Error handling redirect result:', error);
  }
  }
}
