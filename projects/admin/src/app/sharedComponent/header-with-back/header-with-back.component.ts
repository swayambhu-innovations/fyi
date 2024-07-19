import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header-with-back',
  standalone: true,
  imports: [],
  templateUrl: './header-with-back.component.html',
  styleUrl: './header-with-back.component.scss'
})
export class HeaderWithBackComponent {
  constructor(private location: Location) {}
  
  @Input() pageTitle: string='';

  back(): void {
    this.location.back();
  }
}
