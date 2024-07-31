import { Component } from '@angular/core';
import {HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';
import { NavbarComponent } from '../sharedComponent/navbar/navbar.component';
import { ReceivingEventComponent } from "./receiving-event/receiving-event.component";
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderWithMenuComponent, NavbarComponent, ReceivingEventComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
