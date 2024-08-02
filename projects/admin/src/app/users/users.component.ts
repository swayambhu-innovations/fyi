import { Component } from '@angular/core';
import {HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderWithMenuComponent, HeaderWithBackComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
}
