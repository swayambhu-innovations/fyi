import { Injectable } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CatalogueService {

  constructor(private firestore: Firestore) {}

  addCatalogue(catalogueDetail: any) {
    console.log(catalogueDetail);
    if (catalogueDetail.id) {
      const catalogueDocRef = doc(this.firestore, "service-catalogue", catalogueDetail.id);
      return updateDoc(catalogueDocRef, catalogueDetail);
    } else {

      const newCatalogueDocRef = doc(collection(this.firestore, "service-catalogue")); 
      catalogueDetail.id = newCatalogueDocRef.id; 
      return setDoc(newCatalogueDocRef, catalogueDetail);

    }
  }

  getCatalogueList(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'service-catalogue');
      onSnapshot(collectionRef, (snapshot) => {
        const catalogueList = snapshot.docs.map(doc => ({
          ...doc.data()
        }));
        observer.next(catalogueList);
      }, (error) => {
        observer.error(error);
      });
    })
  }
}
