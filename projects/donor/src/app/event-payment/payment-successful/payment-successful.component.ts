import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../../sharedComponent/header-with-back/header-with-back.component";
import { EventService } from '../../home/event/event.service';
@Component({
  selector: 'app-payment-successful',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './payment-successful.component.html',
  styleUrl: './payment-successful.component.scss'
})
export class PaymentSuccessfulComponent {
  bookingDetail:any
  constructor(private router: Router ,  private EventService:EventService){

    this.bookingDetail=this.EventService.bookingDetails()
    if (this.bookingDetail.valueOf.length==0) {
      this.router.navigate(['home']);
    }
    
  }

naviagateToHomepage(){
  this.router.navigate(['home']);
}
}
