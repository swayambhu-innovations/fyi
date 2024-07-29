import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from '../../../sharedComponent/header-with-back/header-with-back.component';
import { EventService } from '../event.service';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss',
})
export class EventListComponent {
  constructor(private router: Router, public EventService: EventService) {}
  items = [
    {
      image: '/assets/homepage/eventimage.svg', // Adjust the path to your image
      title: 'Cearic Kashi Summit 2024',
    },
    {
      image: '/assets/homepage/eventlist.svg', // Adjust the path to your image
      title: 'Cearic Kashi Summit 2025',
    },
    {
      image: '/assets/homepage/eventimage.svg', // Adjust the path to your image
      title: 'Cearic Kashi Summit 2026',
    },
  ];
  viewSlsbList(eventId: any,event:any) {
    let bookingDetails =this.EventService.bookingDetails()
    bookingDetails['event'] = event;
    this.EventService.bookingDetails.set(bookingDetails);
    this.router.navigate(['slab', eventId]);
  }
}
