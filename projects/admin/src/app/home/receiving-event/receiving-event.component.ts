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
  
  

bookingdetail(BookingId: string): void {
  this.router.navigate(['booking-detail', BookingId]);
}
  bookings: string[] |any;

  async getUsersBooking() {
    this.bookings = [];
    const usersSnapshot = await this.receivingEventService.getAllUsers();

    for (const user of usersSnapshot.docs) {
      const userId = user.id;
      const bookingsSnapshot = await this.receivingEventService.getUserBookings(userId);
      for (const booking of bookingsSnapshot.docs) {
        const bookingData = booking.data();
        console.log(bookingData)
        this.bookings.push({
          "BookingId": bookingData["id"],
          "name": bookingData["customer"].name,
          "contact": bookingData["customer"].phoneNumber,
          "eventname": bookingData["event"].eventName,
          "slabname": bookingData["slab"].name,
          "varientname": bookingData["variant"].name,
          "price": bookingData["variant"].totalTicket,
          "tickets": bookingData["totalMember"],
          
        });
      }
    }
    console.log(this.bookings);
  }
}


