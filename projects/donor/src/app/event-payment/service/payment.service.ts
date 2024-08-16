import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environment';
import { Observable, Subject } from 'rxjs';
import { collection, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { EventService } from '../../home/event/event.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private EventService: EventService,
    private firestore: Firestore
  ) {}

  createOrder(
    amount: number,
    currency: string = 'INR',
    receipt: string
  ): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = {
      amount,
      currency,
      receipt,
    };
    return this.http.post<any>(environment.cloudFunctions.createOrder, body, {
      headers,
    });
  }

  async addInbooking() {
    try {
      let userId = this.EventService.bookingDetails()['customer'].uid;
      let bookingDetail = this.EventService.bookingDetails();
      const bookingId = bookingDetail.id;
      const bookingDocRef = doc(
        this.firestore,
        'users',
        userId,
        'bookings',
        bookingId
      );
      return await setDoc(bookingDocRef, bookingDetail);
    } catch (e) {
      console.error('Error adding document: ', e);
      return e;
    }
  }

  async deleteBookingFromCart() {
    let userId = this.EventService.bookingDetails()['customer'].uid;
    let bookingId = this.EventService.bookingDetails()['id'];
    let cartDocRef = doc(this.firestore, 'users', userId, 'cart', bookingId);
    return await deleteDoc(cartDocRef);
  }

  formatDateTime(date: Date): { formattedDate: string; formattedTime: string } {
    const dateOptions: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleDateString('en-GB', dateOptions);
    const formattedTime = date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    });

    return { formattedDate, formattedTime };
  }

  initiatePayment(detail: any) {
    let bookingDetail = this.EventService.bookingDetails();
    let isPaid=false

    const now = new Date();
    const { formattedDate, formattedTime } = this.formatDateTime(now);

    bookingDetail['paymentDetail'].date = formattedDate;
    bookingDetail['paymentDetail'].time = formattedTime;

    const options = {
      key: environment.RAZORPAY_KEY_ID,
      amount: detail.amount * 100,
      currency: 'INR',
      name: 'FYI',
      order_id: detail.order_id,
      handler: (response: any) => {
        isPaid=true;
        let paymentSuccessResponse = {
          order_id: detail.order_id,
          receipt_id: detail.receiptId,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };
        bookingDetail['paymentDetail'].paymentStatus = 'success';
        (bookingDetail['paymentDetail'].paymentResponse =
          paymentSuccessResponse),
          this.EventService.bookingDetails.set(bookingDetail);
        this.addInbooking().then(() => {
          this.deleteBookingFromCart().then(() => {
            this.router.navigate(['/payment-successful']);
          });
        });
      },
      prefill: {
        name: detail.customerName,
        email: '',
        contact: detail.contact,
      },
      modal: {
        ondismiss: () => {
          // bookingDetail['paymentDetail'].paymentStatus = 'failed';
          // this.EventService.bookingDetails.set(bookingDetail);
          // this.router.navigate(['/patmentfailed']);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on('payment.failed', (response: any) => {
      if(!isPaid){
      bookingDetail['paymentDetail'].paymentStatus = 'failed';
      this.EventService.bookingDetails.set(bookingDetail);
      this.addInbooking().then(() => {
        this.deleteBookingFromCart().then(() => {
          this.router.navigate(['/patmentfailed']);
        });
      });
    }
    });

    rzp.open();
  }
}
