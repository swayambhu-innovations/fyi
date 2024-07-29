import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [HeaderWithBackComponent,CommonModule],
  templateUrl: './booking-details.component.html',
  styleUrl: './booking-details.component.scss'
})
export class BookingDetailsComponent {
  selectedTab: string = 'description'; // Default tab
  descriptionContent: string =
    'This is the description content. It should be visible when the Description tab is clicked.';
  itineraryContent: string =
    'This is the itinerary content. It should be visible when the Itinerary tab is clicked.';

  selectedButtonIndex: number | null = null;
  quantities: number[] = [];

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
