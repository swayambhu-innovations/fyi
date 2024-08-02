import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { distinctUntilChanged, Observable } from 'rxjs';
import { TaxService } from '../../tax/service/tax.service';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  taxTypes: any[] = [];
  constructor(private firestore: Firestore, private TaxService: TaxService) {
    this.getTaxTypes();
  }

  getTaxTypes() {
    this.TaxService.getTax().subscribe((data: any) => {
      data.map((item: any) => {
        if (item['active']) {
          this.taxTypes.push(item);
          console.log('tax', this.taxTypes);
        }
      });
    });
  }

  isTaxTypeActive(taxType: any) {
    return this.taxTypes.some((tax) => tax.taxId === taxType && tax.active);
  }

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
      let newEventDocRef: any;
      if (!slab.slabId) {
        newEventDocRef = doc(
          collection(
            this.firestore,
            'events',
            slabAndVariantDetail.eventId,
            'slab-variant'
          )
        );
        slab.slabId = newEventDocRef.id;
      } else {
        newEventDocRef = doc(
          this.firestore,
          'events',
          slabAndVariantDetail.eventId,
          'slab-variant',
          slab.slabId
        );
      }
      slab.variants.map(async (variant: any) => {
        let newVarientDocRef: any;
        if (!variant.variantId) {
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
        } else {
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
  async addEventInCity(city: any) {
    console.log(city);
    const cityDocRef = doc(
      this.firestore,
      'city-catalogue',
      city.stateId,
      'city',
      city.cityId
    );
    await getDoc(cityDocRef).then(async (cityDetail: any) => {
      console.log(cityDetail.data()?.['events']);
      let eventIdListInCity = cityDetail.data()?.['events'] || [];
      if (!eventIdListInCity.includes(city.eventId)) {
        eventIdListInCity.push(city.eventId);
        console.log(`Event ID ${city.eventId} added.`);
      } else {
        console.log(`Event ID ${city.eventId} is already in the array.`);
      }

      await updateDoc(cityDocRef, {
        events: eventIdListInCity
      });
    });
    const newEventDocRef = doc(
      collection(this.firestore, 'events', city.eventId, 'cities')
    );

    city.id = newEventDocRef.id;
    return await setDoc(newEventDocRef, city);
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
      const collectionRef = doc(
        this.firestore,
        'events',
        eventId,
        'itinerary',
        'activities'
      );
      onSnapshot(
        collectionRef,
        (snapshot) => {
          let activities = snapshot.data();
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
      const eventCollectionRef = collection(
        this.firestore,
        'events',
        eventId,
        'slab-variant'
      );

      onSnapshot(
        eventCollectionRef,
        (slabSnapshot) => {
          let slabs = [];
          let slabsFetched = 0;

          slabSnapshot.forEach((slabDoc) => {
            const slabData = slabDoc.data();
            slabData['variants'] = [];
            const slabVariantsCollectionRef = collection(
              this.firestore,
              'events',
              eventId,
              'slab-variant',
              slabDoc.id,
              'variants'
            );

            onSnapshot(
              slabVariantsCollectionRef,
              (variantSnapshot) => {
                // slabData['variants'] = variantSnapshot.docs.map(
                //   (variantDoc) => ({ ...variantDoc.data() })
                // );
                slabData['variants'] = variantSnapshot.docs
                  .map((variantDoc) => variantDoc.data())
                  .filter((variant) =>
                    this.isTaxTypeActive(variant?.['taxType'])
                  );

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
      const collectionRef = collection(
        this.firestore,
        'events',
        eventId,
        'cities'
      );
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

  async deleteEvent(eventId: any) {
    const slabCollection = collection(this.firestore, 'events', eventId,'slab-variant');
  
    const slabDocs = await getDocs(query(slabCollection));
    slabDocs.forEach(async (docSnapshot) => {
      await this.deleteSlab(`events/${eventId}/slab-variant/${docSnapshot.id}`).then(async()=>{
        await deleteDoc(doc(this.firestore, 'events', eventId, 'itinerary','activities'));
        return deleteDoc(doc(this.firestore, 'events', eventId));
      });
    });

  }

  async deleteSlab(docAddress: any) {
    await this.deleteSubcollection(docAddress).then(() => {
      return deleteDoc(doc(this.firestore, docAddress));
    })
  }

  async deleteSubcollection(parentDocAddress: string) {
    const variantsCollection = collection(this.firestore, `${parentDocAddress}/variants`);
  
    const variantDocs = await getDocs(query(variantsCollection));
    variantDocs.forEach(async (docSnapshot) => {
      await deleteDoc(doc(this.firestore, `${parentDocAddress}/variants/${docSnapshot.id}`));
    });
  }

  delete(docAddress: any) {
    return deleteDoc(doc(this.firestore, docAddress));
  }
  
  async deleteCity(city: any) {
    console.log(city);
    const cityDocRef = doc(
      this.firestore,
      'city-catalogue',
      city.stateId,
      'city',
      city.cityId
    );
    await getDoc(cityDocRef).then(async (cityDetail: any) => {
      console.log(cityDetail.data()?.['events']);
      let eventIdListInCity = cityDetail.data()?.['events'] || [];
      if (eventIdListInCity.includes(city.eventId)) {

        const updatedEventIdList = eventIdListInCity.filter((id:any) => id !== city.eventId);
        console.log(`Event ID ${city.eventId} removed.`);
      console.log(updatedEventIdList)
        await updateDoc(cityDocRef, {
          events: updatedEventIdList
        });

      } 
    })
    return deleteDoc(doc(this.firestore,'events',city.eventId,'cities',city.id));
  }

  changeStatusOfSlab(eventId: any, slabId: any, status: any) {
    console.log('events', eventId, 'slab-variant', slabId);
    return updateDoc(
      doc(this.firestore, 'events', eventId, 'slab-variant', slabId),
      {
        active: status,
      }
    );
  }
  changeStatusOfVariant(
    eventId: any,
    slabId: any,
    variantId: any,
    status: any
  ) {
    console.log(eventId, slabId, variantId);
    return updateDoc(
      doc(
        this.firestore,
        'events',
        eventId,
        'slab-variant',
        slabId,
        'variants',
        variantId
      ),
      {
        active: status,
      }
    );
  }
}
