import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HeaderWithBackComponent } from "../../sharedComponent/header-with-back/header-with-back.component";
import { EventService } from '../../home/event/event.service';
import { PaymentService } from '../service/payment.service';
@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './payment-failed.component.html',
  styleUrl: './payment-failed.component.scss'
})
export class PaymentFailedComponent {
bookingDetail:any
  constructor(private router: Router ,  private EventService:EventService, private PaymentService:PaymentService){
    this.bookingDetail=this.EventService.bookingDetails()
    console.log(this.bookingDetail)
    if (this.bookingDetail.valueOf.length==0) {
      this.router.navigate(['home']);
    }
    
  }

  naviagateToHomepage(){
    this.router.navigate(['home']);
  }
  generateUniqueReceipt(): string {
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const randomId = Math.random().toString(36).substring(2, 10); // Random alphanumeric string
    return `receipt_${timestamp}_${randomId}`;
  }

  tryAgain() {
    let bookingDetail=this.EventService.bookingDetails();
    let receiptId = this.generateUniqueReceipt()
    let amount = bookingDetail['paymentDetail'].totalPrice;

    console.log(bookingDetail)
    this.PaymentService.createOrder(amount*100, 'INR', receiptId).subscribe(response => {
      console.log(response)
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
