import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { HeaderWithBackComponent } from "../../sharedComponent/header-with-back/header-with-back.component";

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [HeaderWithBackComponent],
  templateUrl: './payment-failed.component.html',
  styleUrl: './payment-failed.component.scss'
})
export class PaymentFailedComponent {

  constructor(private router: Router){}

  naviagateToHomepage(){
    this.router.navigate(['home']);
  }
}
