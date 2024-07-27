import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class MemberDetailService {

  constructor(private firestore: Firestore ) { }
  async createCoupon(data: any) {
    try {
      const docRef = await addDoc(collection(this.firestore, 'member-details'), data);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
