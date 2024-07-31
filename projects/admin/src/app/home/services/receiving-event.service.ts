import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReceivingEventService {

  constructor(private firestore: Firestore, ) {}

    async getAllUsers() {
      return  await getDocs(collection(this.firestore, 'users'));
     
     }
     async getUserBookings(userId: string) {
      return await getDocs(collection(this.firestore, 'users', userId, 'bookings'));
    }
 
    delete(userId: any,bookingId:any) {
      return deleteDoc(doc(this.firestore, 'users', userId, 'bookings',bookingId));
    }
  
}
