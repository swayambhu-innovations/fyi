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

  async addEvent(eventDetail: any) {
    if (eventDetail.eventId) {
      const eventDocRef = doc(this.firestore, 'events', eventDetail.eventId);
      await updateDoc(eventDocRef, eventDetail);
      return {eventId:eventDetail.eventId}

    } else {
      const newEventDocRef = doc(collection(this.firestore, 'events'));
      eventDetail.eventId = newEventDocRef.id;
      await setDoc(newEventDocRef, eventDetail);
      return {eventId:eventDetail.eventId}
    }
  }
  
  async addItinerary(itineraryDetail:any){
      const newEventDocRef = doc(this.firestore, 'events',itineraryDetail.eventId,'itinerary','activities');
      return setDoc(newEventDocRef, itineraryDetail); 
  }

  async addSlabAndVariant(slabAndVariantDetail:any){
    console.log(slabAndVariantDetail)
    // if (eventDetail.eventId) {
    //   const eventDocRef = doc(this.firestore, 'events', eventDetail.eventId);
    //   await updateDoc(eventDocRef, eventDetail);
    //   return {eventId:eventDetail.eventId}

    // } else {
      slabAndVariantDetail.slabs.map(async(slab:any)=>{
        let variants:any[]=[]
        const newEventDocRef = doc(collection(this.firestore, 'events',slabAndVariantDetail.eventId,'slab-variant'));
        slab.slabId = newEventDocRef.id;
        slab.variants.map(async(variant:any)=>{
          const newEventDocRef = doc(collection(this.firestore, 'events',slabAndVariantDetail.eventId,'slab-variant',slab.slabId,'variants'));
          variant.variantId = newEventDocRef.id;
          variants.push(variant.variantId)
          console.log('variants',variants)
          await setDoc(newEventDocRef, variant);
         
        })
        console.log('variants',variants)
        console.log('slab',slab)

        slab.variants=variants
        console.log('slab',slab)

        await setDoc(newEventDocRef, slab);
      })
      
    //}

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

  addSlab(eventDetail: any) {
    if (eventDetail.eventId) {
      const taxDocRef = doc(this.firestore, 'events', eventDetail.eventId);
      return updateDoc(taxDocRef, eventDetail);
    } else {
      const newEventDocRef = doc(collection(this.firestore, 'events'));
      eventDetail.eventId = newEventDocRef.id;
      return setDoc(newEventDocRef, eventDetail);
    }
  }
 
}
