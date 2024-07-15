import { Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { ref } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(private Firestore: Firestore) {}

  async getCurrentLocation(): Promise<{ lat: number; lng: number }> {
    if (navigator.geolocation) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      throw new Error('Geolocation is not supported by this browser.');
    }
  }

  async getStateFromCoordinates(lat: number, lng: number): Promise<string> {
    console.log(lat, lng);
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat, lng };
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        { location: latlng },
        (
          results: google.maps.GeocoderResult[] | null,
          status: google.maps.GeocoderStatus
        ) => {
          if (status === 'OK') {
            if (results && results[0]) {
              const state = this.getStateFromGeocodeResults(results);
              if (state) {
                resolve(state);
              } else {
                reject(new Error('State not found in the address components.'));
              }
            } else {
              reject(new Error('No results found.'));
            }
          } else {
            reject(new Error('Geocoder failed due to: ' + status));
          }
        }
      );
    });
  }

  private getStateFromGeocodeResults(
    results: google.maps.GeocoderResult[]
  ): string | null {
    for (const result of results) {
      for (const component of result.address_components) {
        if (component.types.includes('administrative_area_level_1')) {
          console.log(component.long_name);
          return component.long_name;
        }
      }
    }
    return null;
  }

  async getCity(state: any) {
    const stateRef = collection(this.Firestore, 'city-catalogue');
    const q = query(stateRef, where('state', '==', state));
    const querySnapshot = await getDocs(q);

    const stateDoc = querySnapshot.docs[0];

    if (stateDoc) {
      localStorage.setItem('stateDocId', stateDoc.id);

      const cityRef = getDocs(
        collection(this.Firestore, 'city-catalogue', stateDoc.id, 'city')
      );

      return cityRef;
    } else {
      return null;
    }
  }
}
