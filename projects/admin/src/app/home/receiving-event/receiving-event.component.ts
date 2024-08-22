import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReceivingEventService } from '../services/receiving-event.service';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { booking } from './booking.structure';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { LoadingService } from '../../../../../shared-ui/src/lib/spinner/loading.service';
@Component({
  selector: 'app-receiving-event',
  standalone: true,
  imports: [CommonModule, BookingDetailsComponent],
  templateUrl: './receiving-event.component.html',
  styleUrl: './receiving-event.component.scss',
})
export class ReceivingEventComponent {
  bookingdata: booking | any;

  ngOnInit(): void {
    this.LoadingService.show();
    this.getUsersBooking().then(() => this.LoadingService.hide())
    .catch((err) => {
      this.LoadingService.hide();
      console.error(err);
    });
  }
  constructor(
    private router: Router,
    private receivingEventService: ReceivingEventService,
    private firestore: Firestore,
    private LoadingService: LoadingService
  ) {}

  bookingdetail(BookingId: string): void {
    this.router.navigate(['booking-detail', BookingId]);
  }
  bookings: string[] | any;

  async getUsersBooking() {
    this.bookings = [];
    const usersSnapshot = await this.receivingEventService.getAllUsers();

    for (const user of usersSnapshot.docs) {
      const userId = user.id;
      let bookingsSnapshot: any;
      await this.receivingEventService.getUserBookings(userId).then((res) => {
        bookingsSnapshot = res;
      }).
      catch((err) => {
        this.LoadingService.hide();
        console.error(err);
      });

      for (const booking of bookingsSnapshot.docs) {
        this.LoadingService.hide();

        const bookingData = booking.data();
        if (bookingData['paymentDetail'].paymentStatus == 'success') {
          this.bookings.push({
            BookingId: bookingData['id'],
            image: bookingData['event']['images'][0],

            name: bookingData['customer'].name,
            contact: bookingData['customer'].phoneNumber,
            eventname: bookingData['event'].eventName,
            slabname: bookingData['slab'].name,
            varientname: bookingData['variant'].name,
            price: bookingData['paymentDetail'].totalPrice,
            tickets: bookingData['totalMember'],
          });
        }
      }
    }
  }
}
