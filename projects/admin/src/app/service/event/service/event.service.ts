import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private firestore: Firestore) {}

  //dummy object for testing
  testFun() {
    let eventDetail = {
      eventId: null,
      eventName: 'Music Festival',
      description:
        'A grand music festival featuring various artists and bands.',
      imageUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
        'https://example.com/image3.jpg',
      ],
      active: true,
      startDate: '2024-08-01',
      lastDate: '2024-08-05',
      cityLinked: 0,
      totalSeats: 100,
      bookedSeats: 150,
    };

    this.addEvent(eventDetail);
  }

  addEvent(eventDetail: any) {
    if (eventDetail.eventId) {
      const taxDocRef = doc(this.firestore, 'events', eventDetail.eventId);
      return updateDoc(taxDocRef, eventDetail);
    } else {
      const newEventDocRef = doc(collection(this.firestore, 'events'));
      eventDetail.eventId = newEventDocRef.id;
      return setDoc(newEventDocRef, eventDetail);
    }
  }

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

  deleteEvent(eventId: any) {
    return deleteDoc(doc(this.firestore, 'events', eventId));
  }
}
