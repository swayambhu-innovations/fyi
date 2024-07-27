import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
@Component({
  selector: 'app-varient-selection',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './varient-selection.component.html',
  styleUrl: './varient-selection.component.scss'
})
export class VarientSelectionComponent {
 

   



  constructor(private router: Router) { }
  events = [
    { title: 'Cearic Kashi Summit 2024', image: '/assets/homepage/varient_slider.svg', },
    { title: 'Cearic Kashi Summit 2025', image: '/assets/homepage/varient_slider.svg',  },
    { title: 'Cearic Kashi Summit 2026', image: '/assets/homepage/varient_slider.svg',  },
    { title: 'Cearic Kashi Summit 2027', image: '/assets/homepage/varient_slider.svg', },
    // Add more surveys here
  ];
  items = [
    { title: 'Rotracter', price: 6010 },
    { title: 'Rotarians', price: 6010 },
    { title: 'Couples', price: 6010 }
  ];

  selectedTab: string = 'description';  // Default tab
  descriptionContent: string = 'This is the description content. It should be visible when the Description tab is clicked.';
  itineraryContent: string = 'This is the itinerary content. It should be visible when the Itinerary tab is clicked.';

  selectedButtonIndex: number | null = null;
  quantities: number[] = [];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  memberform(index: number) {
    this.selectedButtonIndex = index;
    this.quantities[index] = 1;
  }

  increaseQuantity(index: number) {
    if (this.quantities[index] < 99) {
      this.quantities[index]++;
    }
  }

  decreaseQuantity(index: number) {
    if (this.quantities[index] > 1) {
      this.quantities[index]--;
    }
  }

  removeSelection() {
    this.selectedButtonIndex = null;
  }
  goToNextPage() {
    this.router.navigate(['member-detail']);
  }
}


