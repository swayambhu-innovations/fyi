import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReceivingEventService } from '../services/receiving-event.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { booking } from './booking.structure';
import { BookingDetailsComponent } from "./booking-details/booking-details.component";
@Component({
  selector: 'app-receiving-event',
  standalone: true,
  imports: [CommonModule, BookingDetailsComponent],
  templateUrl: './receiving-event.component.html',
  styleUrl: './receiving-event.component.scss'
})
export class ReceivingEventComponent {
  
  bookingdata: booking | any;


  ngOnInit(): void {
    this.getUsersBooking();
  }
  constructor(private router:Router,private receivingEventService:ReceivingEventService, private firestore: Firestore, ){}
  
  bookingdetail(BookingId:string){
    this.router.navigate(['booking-detail']);
    this.bookings.map((booking: booking)=>{
      this.bookingdata=booking
    })
    console.log(this.bookingdata)
  }
 
  bookings: string[] |any;
  async getUsersBooking() {
    this.bookings = [];
    const usersSnapshot = await this.receivingEventService.bookingdetails();
      usersSnapshot.docs.forEach(async (user: { id: string }) => {
      const bookingsSnapshot = await getDocs(
        collection(this.firestore, "users", user.id, "bookings")
      );
      bookingsSnapshot.docs.forEach(async (booking) => {
        console.log(booking.data());
        const bookingData = booking.data();
        this.bookings.push({
          "BookingId": bookingData["id"],
          "name":bookingData["customer"].name,
          "contact":bookingData["customer"].phoneNumber,
          "eventname":bookingData["event"].eventName,
          "slabname":bookingData["slab"].name,
          "varientname":bookingData["variant"].name,
          "price":bookingData["variant"].totalTicket,
          "tickets":bookingData["totalMember"],

        })
        console.log(this.bookings)
      }
      )}
    
  )};

}

