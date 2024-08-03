import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationItemService {

  
  constructor(private firestore: Firestore) {}

  addDonationItem(donationItemDetail: any) {
    if (donationItemDetail.itemId) {
      const donationItemDocRef = doc(this.firestore, "donation-items", donationItemDetail.itemId);
      return updateDoc(donationItemDocRef, donationItemDetail);
    } else {

      const newdonationItemDocRef = doc(collection(this.firestore, "donation-items")); 
      donationItemDetail.itemId = newdonationItemDocRef.id; 
      return setDoc(newdonationItemDocRef, donationItemDetail);

    }
  }

  getDonationItems(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'donation-items');
      onSnapshot(collectionRef, (snapshot) => {
        const donationTypes = snapshot.docs.map(doc => ({
          ...doc.data()
        }));
        observer.next(donationTypes);
      }, (error) => {
        observer.error(error);
      });
    })
  }
  
  deleteDonationItem(itemId: any) {
    return deleteDoc(doc(this.firestore, "donation-items", itemId));
  }
}
