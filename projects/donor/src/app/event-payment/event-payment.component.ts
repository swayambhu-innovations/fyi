import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";

@Component({
  selector: 'app-event-payment',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './event-payment.component.html',
  styleUrl: './event-payment.component.scss'
})
export class EventPaymentComponent {
constructor(private router: Router){}
  moveToSuccessful(){
  
    this.router.navigate(['payment-successful']);
  }
}
