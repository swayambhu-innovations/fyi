import { Component } from '@angular/core';
import {HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';
import { NavbarComponent } from '../sharedComponent/navbar/navbar.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderWithMenuComponent,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
