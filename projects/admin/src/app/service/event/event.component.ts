import { Component, ElementRef, Input, Renderer2, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFor } from '@angular/common';
interface Event {
  name: string;
  imageUrl: string;
  booked: number;
  capacity: number;
  status: string;
}
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [MatExpansionModule,NgFor],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  imageUrl: string | undefined
  // const myElement = document.getElementById("demo");

  events: Event[] = [
    {
      name: 'Cearic Kashi Summit 2023',
      imageUrl: '/assets/login/bg.jpg',
      booked: 125,
      capacity: 200,
      status: 'Booked'
    },
    {
      name: 'Cearic Kashi Summit 2023',
      imageUrl: '/assets/login/bg.jpg',
      booked: 125,
      capacity: 200,
      status: 'Booked'
    },
    {
      name: 'Cearic Kashi Summit 2023',
      imageUrl: '/assets/login/bg.jpg',
      booked: 125,
      capacity: 200,
      status: 'Booked'
    },
    {
      name: 'Cearic Kashi Summit 2023',
      imageUrl: '/assets/login/bg.jpg',
      booked: 125,
      capacity: 200,
      status: 'Booked'
    },
    // Add more event objects as needed
  ];

  viewEvent(event: Event): void {
    console.log('Viewing event', event);
  }

  editEvent(event: Event): void {
    console.log('Editing event', event);
  }

  deleteEvent(event: Event): void {
    console.log('Deleting event', event);
  }
  // image: string ='/assets/login/even_bg.svg';
  // @Input() imageUrl!: string;
  //   constructor(private elementRef:ElementRef, private renderer: Renderer2) {}
  //   ngOnInit() {
  //       this.renderer.setStyle(
  //           this.elementRef.nativeElement,
  //           'backgroundImage',
  //           `url(${this.imageUrl})`
  //       );
  //   }

}
