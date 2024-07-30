import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
import { EventService } from '../home/event/event.service';
import { environment } from '../../environment';
import { PaymentService } from './service/payment.service';

declare var Razorpay: any;  // Declare Razorpay as an external variable

@Component({
  selector: 'app-event-payment',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './event-payment.component.html',
  styleUrls: ['./event-payment.component.scss']  // Corrected to styleUrls
})
export class EventPaymentComponent {
  constructor(private router: Router, public EventService: EventService,private PaymentService:PaymentService) {}

  payNow() {
    this.router.navigate(['payment-successful']);
  }

  pay() {
    this.PaymentService.createOrder(1000, 'INR', 'receipt#1').subscribe(response => {
      this.PaymentService.initiatePayment(response.id); 
    });
  }

  // createOrder(amount: number, currency: string, receipt: string) {
  //   const callable = this.functions.httpsCallable('createOrder');
  //   return from(callable({ amount, currency, receipt })).pipe(
  //     switchMap((response: any) => {
  //       const options = {
  //         key: '<YOUR_RAZORPAY_KEY>', // Replace with your Razorpay key
  //         amount: amount * 100, // Amount in paise
  //         currency,
  //         name: 'Your Company',
  //         description: 'Test Transaction',
  //         order_id: response.orderId,
  //         handler: (response: any) => {
  //           console.log('Payment successful:', response);
  //         },
  //         prefill: {
  //           name: 'Customer Name',
  //           email: 'customer@example.com',
  //           contact: '9876543210',
  //         },
  //       };

  //       const rzp = new (window as any).Razorpay(options);
  //       rzp.open();
  //       return rzp;
  //     })
  //   );
  // }

  // async createBooking() {
  //   let bookingDetail:any = this.EventService.bookingDetails()
  //     this.PaymentService
  //       .handlePayment({
  //         grandTotal: bookingDetail['paymentDetail'].totalPrice,
  //         user: {
  //           phone: bookingDetail['customer'].phoneNumber || '',
  //         },
  //       }).subscribe(async (paymentResponse:any) => {
  //         if (
  //           paymentResponse.stage == 'paymentCaptureSuccess' ||
  //           paymentResponse.stage == 'paymentCaptureSuccess'
  //         ) {
           
  //           bookingDetail['paymentDetail'].payment = paymentResponse;
  //           this.PaymentService.addBooking().then((res:any) => {
  //             this.router.navigate(['/authorized/order-placed']);
  //           });
  //         } else {
  //           console.info(
  //             'payment Response faild........: ',
  //             JSON.stringify(paymentResponse)
  //           );
  //           paymentResponse.status = 'faild';
  //           if (bookingDetail) {
  //             if (paymentResponse.stage == 'paymentCaptureFailed') {
  //               bookingDetail['paymentDetail'].payment = paymentResponse;
  //               this.router.navigate(['/authorized/order-placed']);
  //             } else if (
  //               paymentResponse.stage == 'paymentGatewayClosed' ||
  //               paymentResponse.stage == 'paymentGatewayOpened'
  //             ) {
  //               setTimeout(() => {
  //               }, 5000);
  //             } else {
  //             }
  //           }
  //         }
  //       });
  // }
}
