import { Injectable } from '@angular/core';
import { ApplicationVerifier, Auth, signInWithPhoneNumber } from '@angular/fire/auth';
import { doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { DataProviderService } from './data-provider.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(    public auth: Auth,private Firestore:Firestore,private dataProvider:DataProviderService,
  ) { }
  async loginWithPhoneNumber(phone: string, appVerifier: ApplicationVerifier) {
    console.log('loginWithPhoneNumber', phone);
    if (phone.length != 10) {
      return Promise.reject(new Error('Invalid Phone Number'));
    }
    return signInWithPhoneNumber(this.auth, '+91' + phone, appVerifier);
  }


  async setUserData(user:any) {
    
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
      dob:user.dob ||'',
      gender:user.gender ||'',
      age:user.age ||'',

    };
    await setDoc(doc(this.Firestore, 'users', user.uid), newUserData);
    this.dataProvider.currentUser = {
      user: user,
      userData: newUserData,
    };
    console.log(this.dataProvider.currentUser)
    return;
  }
}

