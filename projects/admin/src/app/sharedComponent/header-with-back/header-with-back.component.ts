import { Component } from '@angular/core';

@Component({
  selector: 'app-header-with-back',
  standalone: true,
  imports: [],
  templateUrl: './header-with-back.component.html',
  styleUrl: './header-with-back.component.scss'
})
export class HeaderWithBackComponent {
  pageTitle='Manage Service';
}
