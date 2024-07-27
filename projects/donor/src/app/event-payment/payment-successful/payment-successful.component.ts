import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../../sharedComponent/header-with-back/header-with-back.component";

@Component({
  selector: 'app-payment-successful',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './payment-successful.component.html',
  styleUrl: './payment-successful.component.scss'
})
export class PaymentSuccessfulComponent {
  constructor(private router: Router){}

naviagateToHomepage(){
  this.router.navigate(['home']);
}
}
