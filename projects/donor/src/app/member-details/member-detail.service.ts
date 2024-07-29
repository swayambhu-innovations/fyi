import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { addDoc, collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { EventService } from '../home/event/event.service';
@Injectable({
  providedIn: 'root'
})
export class MemberDetailService {

  constructor(private firestore: Firestore,private EventService:EventService ) { }
  async addInbooking() {
    try {
      console.log(this.EventService.bookingDetails())
      let userId=this.EventService.bookingDetails()['customer'].uid
      let bookingDetail = this.EventService.bookingDetails()
      console.log(this.EventService.bookingDetails())
      const newBookingDocRef = doc(collection(this.firestore, 'users',userId,'bookings')); 
      bookingDetail.id = newBookingDocRef.id; 
      setDoc(newBookingDocRef, bookingDetail);
      return {bookingId:bookingDetail.id}
    }
     catch (e) {
      console.error("Error adding document: ", e);
      return e
    }
  }
}
