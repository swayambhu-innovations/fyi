import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  items: string[] = ['A', 'B', 'C', 'D', 'Event'];

  activeIndex: number = -1; 

  setActive(index: number) {
    this.activeIndex = index;
  }
}
