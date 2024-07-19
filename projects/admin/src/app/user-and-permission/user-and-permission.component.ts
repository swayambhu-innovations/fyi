import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";

@Component({
  selector: 'app-user-and-permission',
  standalone: true,
  imports: [HeaderWithMenuComponent],
  templateUrl: './user-and-permission.component.html',
  styleUrl: './user-and-permission.component.scss'
})
export class UserAndPermissionComponent {
 

}
