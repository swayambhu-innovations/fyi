import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private firestore: Firestore) {}

  getEvents(): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'events');
      onSnapshot(
        collectionRef,
        (snapshot) => {
          const events = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          observer.next(events);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }

  async getevents() {
    return await getDocs(collection(this.firestore, "events"));
  }
}

