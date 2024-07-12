import { Component } from '@angular/core';
import { HeaderWithBackComponent } from '../sharedComponent/header-with-back/header-with-back.component';
import { NavbarComponent } from '../sharedComponent/navbar/navbar.component';
import { TaxComponent } from './tax/tax.component'; 

@Component({
  selector: 'app-service',
  standalone: true,
  imports: [HeaderWithBackComponent,NavbarComponent,TaxComponent],
  templateUrl: './service.component.html',
  styleUrl: './service.component.scss'
})
export class ServiceComponent {

}
