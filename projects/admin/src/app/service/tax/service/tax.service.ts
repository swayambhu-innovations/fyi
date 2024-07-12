import { Injectable } from '@angular/core';
import { addDoc, collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class TaxService {

  constructor(private firestore: Firestore) {}

  addTax(taxDetail: any) {
    console.log(taxDetail);
    if (taxDetail.taxId) {
      const taxDocRef = doc(this.firestore, "tax-types", taxDetail.taxId);
      return updateDoc(taxDocRef, taxDetail);
    } else {
      const taxCollectionRef = collection(this.firestore, "tax-types");
      return addDoc(taxCollectionRef, taxDetail);
    }
  }
}
