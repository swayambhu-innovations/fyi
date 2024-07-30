import { Injectable, signal } from '@angular/core';
import { addDoc, collection, deleteDoc, doc, Firestore, getDocs, onSnapshot, setDoc, updateDoc } from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  cityDoc = signal<any[]>([]);
  eventList = signal<any[]>([]);
  itineraryList = signal<{ [key: string]: any[] }>({});
  slabList = signal<{ [key: string]: any[] }>({});
  variantList = signal<{ [key: string]: any[] }>({});
  bookingDetails = signal<any>({});
  addressList = signal<any[]>([]);
  activeAddress = signal<any>('');


  constructor(private firestore:Firestore ) { 
    
  }

  
  fetchDoc(collectionAddress:any): Observable<any> {
    return new Observable<any>((observer) => {
      const collectionRef = doc(this.firestore, collectionAddress);
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
      getDocs(collectionRef).then((snapshot) => {
        const docs = snapshot.docs.map((doc) => doc.data());
        observer.next(docs);
      }, (error) => {
        observer.error(error);
      });
    })
  }
}
