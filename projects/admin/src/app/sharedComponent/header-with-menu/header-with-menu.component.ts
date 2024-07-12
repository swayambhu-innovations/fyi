import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-with-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-with-menu.component.html',
  styleUrl: './header-with-menu.component.scss'
})
export class HeaderWithMenuComponent {
  user:string= 'Aman'

  
}
