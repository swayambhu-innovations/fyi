import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';

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

      const newTaxDocRef = doc(collection(this.firestore, "tax-types")); 
      taxDetail.taxId = newTaxDocRef.id; 
      return setDoc(newTaxDocRef, taxDetail);

    }
  }

  getTax(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'tax-types');
      onSnapshot(collectionRef, (snapshot) => {
        const taxTypes = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        observer.next(taxTypes);
      }, (error) => {
        observer.error(error);
      });
    }).pipe(
      distinctUntilChanged((prev: any[], curr: any[]) => {
        if (!prev || prev.length !== curr.length) {
          return false;
        }
        for (let i = 0; i < prev.length; i++) {
          if (prev[i].id !== curr[i].id || 
              prev[i].taxName !== curr[i].taxName || 
              prev[i].taxType !== curr[i].taxType || 
              prev[i].taxRate !== curr[i].taxRate) {
            return false;
          }
        }
        return true;
      })
    );
  }
  
  deleteRole(taxDetail: any) {
    return deleteDoc(doc(this.firestore, "tax-types", taxDetail.taxId));
  }
}
