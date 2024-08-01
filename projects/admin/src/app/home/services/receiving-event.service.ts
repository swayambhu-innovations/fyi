import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, updateDoc } from '@angular/fire/firestore';

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
    async updateMember(userId: string, bookingId: string, memberIndex: number, memberData: any) {
      const bookingDocRef = doc(this.firestore, 'users', userId, 'bookings', bookingId);
      const bookingSnapshot = await getDoc(bookingDocRef);
      const bookingData = bookingSnapshot.data();
  
      if (bookingData) {
        const members = bookingData['memberDetail'];
        members[memberIndex] = memberData;
  
        return updateDoc(bookingDocRef, { memberDetail: members });
      }
    }
}
