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
  constructor(private router: Router, public EventService: EventService,private PaymentService:PaymentService) {
   
    let bookingDetail=this.EventService.bookingDetails()
    
  }

  payNow() {
    this.router.navigate(['payment-successful']);
  }
  generateUniqueReceipt(): string {
    const timestamp = Date.now().toString(); 
    const randomId = Math.random().toString(36).substring(2, 10); 
    return `receipt_${timestamp}_${randomId}`;
  }

  pay() {
    let bookingDetail=this.EventService.bookingDetails();
    let receiptId = this.generateUniqueReceipt()
    let amount = bookingDetail['paymentDetail'].totalPrice;

    this.PaymentService.createOrder(amount*100, 'INR', receiptId).subscribe(response => {

      let detail={
        amount: amount,
        description: 'Test Transaction',
        order_id: response.id,
        customerName: bookingDetail['customer'].name,
        contact: bookingDetail['customer'].phoneNumber,
        receiptId:receiptId
    }
      this.PaymentService.initiatePayment(detail); 
    });
  }

}
