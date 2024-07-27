import { Component } from '@angular/core';
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";

@Component({
  selector: 'app-coupon',
  standalone: true,
  imports: [HeaderWithMenuComponent],
  templateUrl: './coupon.component.html',
  styleUrl: './coupon.component.scss'
})
export class CouponComponent {

}
