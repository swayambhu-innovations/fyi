import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaxService {

  constructor(private firestore: Firestore) {}

  addTax(taxDetail: any) {
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
          ...doc.data()
        }));
        observer.next(taxTypes);
      }, (error) => {
        observer.error(error);
      });
    })
  }
  
  deleteTax(taxId: any) {
    return deleteDoc(doc(this.firestore, "tax-types", taxId));
  }

  fetchDoc(docAddress:any): Observable<any> {
    return new Observable<any>((observer) => {
      const collectionRef = doc(this.firestore, docAddress);
      onSnapshot(collectionRef, (snapshot) => {
        const donationTypes = snapshot.data();
        observer.next(donationTypes);
      }, (error) => {
        observer.error(error);
      });
    })
  }

  fetchDocs(collectionAddress:any): Observable<any[]> {
    return new Observable<any>((observer) => {
      const collectionRef = collection(this.firestore, collectionAddress);
      onSnapshot(collectionRef, (snapshot) => {
        const docList = snapshot.docs.map(doc => ({
          ...doc.data()
        }));
        observer.next(docList);
      }, (error) => {
        observer.error(error);
      });
    })
  }
}
