import { inject, Injectable } from '@angular/core';
import {
  ApplicationVerifier,
  Auth,
  signInWithPhoneNumber,
  user,
  User,
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
import { Observable } from 'rxjs';
import { EventService } from '../../home/event/event.service';
import { ToastService } from '../../../../../shared-ui/src/lib/toast/service/toast.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  isProfileUpdated: boolean = false;
  user$: Observable<User | null> = user(this._auth);

  constructor(
    public auth: Auth,
    private Firestore: Firestore,
    private dataProvider: DataProviderService,
    private router: Router,
    private eventService: EventService,
    private ToastService:ToastService
  ) {
    this.dataProvider.checkingAuth = true;
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.ToastService.showSuccess('Already Login')
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
                  this.router.navigate(['home']);
                
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
