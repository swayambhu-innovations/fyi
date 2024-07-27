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
   
    slabAndVariantDetail.slabs.map(async (slab: any) => {
      let variants: any[] = [];
      let newEventDocRef:any;
      if(!slab.slabId){  
      newEventDocRef = doc(
        collection(
          this.firestore,
          'events',
          slabAndVariantDetail.eventId,
          'slab-variant'
        )
      );
          slab.slabId = newEventDocRef.id;
    } 
    else{
       newEventDocRef = doc(
          this.firestore,
          'events',
          slabAndVariantDetail.eventId,
          'slab-variant',slab.slabId,
        
      );
    }
      slab.variants.map(async (variant: any) => {
       let newVarientDocRef:any
        if(!variant.variantId){
           newVarientDocRef = doc(
            collection(
              this.firestore,
              'events',
              slabAndVariantDetail.eventId,
              'slab-variant',
              slab.slabId,
              'variants'
            )
          );
          variant.variantId = newVarientDocRef.id;
        }
        else{
          newVarientDocRef = doc(
           
              this.firestore,
              'events',
              slabAndVariantDetail.eventId,
              'slab-variant',
              slab.slabId,
              'variants',
              variant.variantId
            
          );
        }
        
        variants.push(variant.variantId);
        await setDoc(newVarientDocRef, variant);
      });
      

      slab.variants = variants;

      await setDoc(newEventDocRef, slab);
    });

    //}
  }
  addEventInCity(city: any) {
    const newEventDocRef = doc(collection(this.firestore, 'events', city.eventId, 'cities'));
    city.id = newEventDocRef.id;
    return setDoc(newEventDocRef, city);
  }


  eventDetail(eventId: any) {
    return new Observable<any>((observer) => {
      const docRef = doc(this.firestore, 'events', eventId);
      onSnapshot(
        docRef,
        (doc) => {
          observer.next(doc.data());
        },
        (error) => {
          observer.error(error);
        }
      );
    });
  }
  itineraryOfEvent(eventId: any) {
    return new Observable<any>((observer) => {
      const collectionRef = doc(this.firestore, 'events', eventId, 'itinerary', 'activities');
      onSnapshot(
        collectionRef,
        (snapshot) => {
         let activities = snapshot.data()
          observer.next(activities);
        },
        (error) => {
          observer.error(error);
        }
      );
    });

  }
  getSlabAndVariantOfEvent(eventId: any) {
      return new Observable<any>((observer) => {
        const eventCollectionRef = collection(this.firestore, 'events', eventId, 'slab-variant');
        
        onSnapshot(
          eventCollectionRef,
          (slabSnapshot) => {
            let slabs = [];
            let slabsFetched = 0;
            
            slabSnapshot.forEach((slabDoc) => {
              const slabData = slabDoc.data()
              slabData['variants'] = [];
              const slabVariantsCollectionRef = collection(this.firestore, 'events', eventId, 'slab-variant', slabDoc.id, 'variants');
              
              onSnapshot(
                slabVariantsCollectionRef,
                (variantSnapshot) => {
                  slabData['variants'] = variantSnapshot.docs.map((variantDoc) => ({ ...variantDoc.data() }));
                  
                  slabsFetched++;
                  slabs.push(slabData);
                  
                  if (slabsFetched === slabSnapshot.size) {
                    observer.next(slabs);
                  }
                },
                (error) => {
                  observer.error(error);
                }
              );
            });
          },
          (error) => {
            observer.error(error);
          }
        );
      });
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
    return deleteDoc(doc(this.firestore, docAddress));
  }

changeStatusOfSlab(eventId:any,slabId:any,status:any){
  console.log('events',eventId,'slab-variant',slabId)
  return updateDoc(doc(this.firestore, 'events',eventId,'slab-variant',slabId), {
    active: status,
  });
}
 
}
