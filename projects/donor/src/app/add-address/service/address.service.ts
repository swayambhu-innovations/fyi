import { Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private Firestore: Firestore,private Router:Router) {}
  async getStateList() {
    return getDocs(collection(this.Firestore, 'city-catalogue'));
  }

  async getCityList(stateId: string) {
    return getDocs(
      collection(this.Firestore, 'city-catalogue', stateId, 'city')
    );
  }
  addAddress(address: any, uid: string) {
    console.log(address);
    if (address.taxId) {
      const addressDocRef = doc(
        this.Firestore,
        'users',
        uid,
        'addresses',
        address.addressId
      );
      return updateDoc(addressDocRef, address).then(() => {
        
       }) ;
    } else {
      const newTaxDocRef = doc(
        collection(this.Firestore, 'users', uid, 'addresses')
      );
      address.addressId = newTaxDocRef.id;
      return setDoc(newTaxDocRef, address).then(() => {
        this.Router.navigate(['home']);
      });
    }
  }
}
