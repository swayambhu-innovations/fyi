import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReceivingEventService } from '../../../../admin/src/app/home/services/receiving-event.service';
import { Firestore } from '@angular/fire/firestore';
import { booking } from '../../../../admin/src/app/home/receiving-event/booking.structure';
import { CommonModule } from '@angular/common';
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, HeaderWithMenuComponent, HeaderWithBackComponent],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.scss'
})
export class BookingHistoryComponent {
  bookingdata: booking | any;


  ngOnInit(): void {
    this.getUsersBooking();
  }
  constructor(private router:Router,private receivingEventService:ReceivingEventService, private firestore: Firestore, ){}
  
  

bookingdetail(BookingId: string): void {
  this.router.navigate(['PaymentDetail', BookingId]);
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
  }
}
