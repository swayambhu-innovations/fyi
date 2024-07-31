import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReceivingEventService {

  constructor(private firestore: Firestore, ) {}

    async bookingdetails() {
      return  await getDocs(collection(this.firestore, 'users'));
     
     }
  
}
