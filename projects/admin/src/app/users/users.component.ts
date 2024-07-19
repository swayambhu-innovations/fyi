import { Component } from '@angular/core';
import {HeaderWithMenuComponent } from '../sharedComponent/header-with-menu/header-with-menu.component';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderWithMenuComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {

}
