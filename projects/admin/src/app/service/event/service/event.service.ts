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



  async addEvent(eventDetail: any) {
    if (eventDetail.eventId) {
      const eventDocRef = doc(this.firestore, 'events', eventDetail.eventId);
      await updateDoc(eventDocRef, eventDetail);
      return { eventId: eventDetail.eventId };
    } else {
      const newEventDocRef = doc(collection(this.firestore, 'events'));
      eventDetail.eventId = newEventDocRef.id;
      await setDoc(newEventDocRef, eventDetail);
      return { eventId: eventDetail.eventId };
    }
  }

  async addItinerary(itineraryDetail: any) {
    const newEventDocRef = doc(
      this.firestore,
      'events',
      itineraryDetail.eventId,
      'itinerary',
      'activities'
    );
    return setDoc(newEventDocRef, itineraryDetail);
  }

  async addSlabAndVariant(slabAndVariantDetail: any) {
    console.log(slabAndVariantDetail);
    // if (eventDetail.eventId) {
    //   const eventDocRef = doc(this.firestore, 'events', eventDetail.eventId);
    //   await updateDoc(eventDocRef, eventDetail);
    //   return {eventId:eventDetail.eventId}

    // } else {
    slabAndVariantDetail.slabs.map(async (slab: any) => {
      let variants: any[] = [];
      const newEventDocRef = doc(
        collection(
          this.firestore,
          'events',
          slabAndVariantDetail.eventId,
          'slab-variant'
        )
      );
      slab.slabId = newEventDocRef.id;
      slab.variants.map(async (variant: any) => {
        const newEventDocRef = doc(
          collection(
            this.firestore,
            'events',
            slabAndVariantDetail.eventId,
            'slab-variant',
            slab.slabId,
            'variants'
          )
        );
        variant.variantId = newEventDocRef.id;
        variants.push(variant.variantId);
        console.log('variants', variants);
        await setDoc(newEventDocRef, variant);
      });
      console.log('variants', variants);
      console.log('slab', slab);

      slab.variants = variants;
      console.log('slab', slab);

      await setDoc(newEventDocRef, slab);
    });

    //}
  }
  addEventInCity(city: any) {
    const newEventDocRef = doc(collection(this.firestore, 'events', city.eventId, 'cities'));
    city.id = newEventDocRef.id;
    return setDoc(newEventDocRef, city);
  }
  getCitiesOfEvent(eventId: any) {
    return new Observable<any[]>((observer) => {
      const collectionRef = collection(this.firestore, 'events', eventId, 'cities');
      onSnapshot(
        collectionRef,
        (snapshot) => {
          const cities = snapshot.docs.map((doc) => ({
            ...doc.data(),
          }));
          observer.next(cities);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
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

  async getCities() {
    const states = await getDocs(collection(this.firestore, 'city-catalogue'));
    let citiesData: any[] = [];
  
    const citiesPromises = states.docs.map(async (state) => {
      if (state.data()?.['active']) {
        const cities = await getDocs(
          collection(this.firestore, 'city-catalogue', state.id, 'city')
        );
        cities.docs.forEach((city) => {
          if (city.data()?.['active']) {
            citiesData.push({
              cityId: city.data()?.['cityId'],
              city: city.data()?.['city'],
              state: state.data()?.['state'],
              stateId: state.data()?.['stateId'],
            });
          }
        });
      }
    });
  
    await Promise.all(citiesPromises);
    return citiesData;
  }
  

  deleteEvent(eventId: any) {
    return deleteDoc(doc(this.firestore, 'events', eventId));
  }
  delete(docAddress: any) {
    console.log(docAddress)
    return deleteDoc(doc(this.firestore, docAddress));
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
