import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
import { EventService } from '../home/event/event.service';
@Component({
  selector: 'app-event-payment',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './event-payment.component.html',
  styleUrl: './event-payment.component.scss'
})
export class EventPaymentComponent {
constructor(private router: Router,public EventService:EventService){}
  moveToSuccessful(){
  
    this.router.navigate(['payment-successful']);
  }
}
