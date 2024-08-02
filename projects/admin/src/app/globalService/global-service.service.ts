import { Injectable, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalServiceService {

  constructor(private firestore:Firestore) { }

  private usersFetched = false;
  userList =signal<any[]>([]);
  setUsersFetched(value: boolean) {
    this.usersFetched = value;
  }

  getUsersFetched(): boolean {
    return this.usersFetched;
  }

  fetchDoc(collectionAddress:any): Observable<any> {
    console.log('collectionAddress', collectionAddress);
    return new Observable<any>((observer) => {
      const collectionRef = doc(this.firestore, collectionAddress);
      onSnapshot(collectionRef, (snapshot) => {
        const doc = snapshot.data();
        console.log('doc', doc);
        observer.next(doc);
      }, (error) => {
        observer.error(error);
      });
    })
  }

  fetchDocs(collectionAddress:any): Observable<any[]> {
    return new Observable<any>((observer) => {
      const collectionRef = collection(this.firestore, collectionAddress);
      onSnapshot(collectionRef, (snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data());

        observer.next(docs);
      }, (error) => {
        observer.error(error);
      });
      
    })
  }
}
