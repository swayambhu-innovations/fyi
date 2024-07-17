import { Injectable } from '@angular/core';
import {
  ApplicationVerifier,
  Auth,
  signInWithPhoneNumber,
} from '@angular/fire/auth';
import {
  collection,
  doc,
  docData,
  getDoc,
  getDocs,
  setDoc,
} from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DataProviderService } from './data-provider.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isProfileUpdated: boolean = false;

  constructor(
    public auth: Auth,
    private Firestore: Firestore,
    private dataProvider: DataProviderService,
    private router: Router
  ) {
    this.dataProvider.checkingAuth = true;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.dataProvider.loggedIn = true;
        this.getUserData(user.uid).subscribe(async (userData: any) => {
          this.dataProvider.currentUser = {
            user: user,
            userData: userData,
          };

          if (!userData || !userData.name) {
            this.router.navigate(['profile']);
          } else {
            this.getAddresses(this.dataProvider.currentUser!.user.uid).then(
              (result) => {
                const addresses = result.docs.map((address: any) => {
                  return { ...address.data(), id: address.id };
                });
                if (addresses.length > 0) {
                  this.router.navigate(['home']);
                } else {
                  this.router.navigate(['add-address']);
                }
              }
            );
          }
          this.dataProvider.checkingAuth = false;
        });
      } else {
        this.dataProvider.loggedIn = false;
        this.dataProvider.checkingAuth = false;
      }
    });
  }
  async loginWithPhoneNumber(phone: string, appVerifier: ApplicationVerifier) {
    console.log('loginWithPhoneNumber', phone);
    if (phone.length != 10) {
      return Promise.reject(new Error('Invalid Phone Number'));
    }
    return signInWithPhoneNumber(this.auth, '+91' + phone, appVerifier);
  }

  async setUserData(user: any) {
    let userDoc = await getDoc(doc(this.Firestore, 'users', user.uid));
    if (userDoc.exists()) {
      this.dataProvider.currentUser = {
        user: { ...user, name: userDoc.data()['name'] },
        userData: userDoc.data(),
      };

      return;
    }
    let newUserData = {
      name: user.name || '',
      phoneNumber: user.phoneNumber || '',
      photoURL: user.photoURL || '',
      uid: user.uid || '',
      dob: user.dob || '',
      gender: user.gender || '',
      age: user.age || '',
    };

    await setDoc(doc(this.Firestore, 'users', user.uid), newUserData);
    this.dataProvider.currentUser = {
      user: user,
      userData: newUserData,
    };
    console.log(this.dataProvider.currentUser);
    return;
  }

  getUserData(uid: string) {
    return docData(doc(this.Firestore, 'users', uid));
  }

  async getAddresses(userId: string) {
    return await getDocs(
      collection(this.Firestore, 'users', userId, 'addresses')
    );
  }
}
