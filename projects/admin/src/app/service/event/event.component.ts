import { Component, ElementRef, Input, Renderer2, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgFor } from '@angular/common';
import { AddeventComponent } from "./addevent/addevent.component";
import { EventService } from './service/event.service';
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
  imports: [MatExpansionModule,NgFor,AddeventComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  providers: [EventService]
})
export class EventComponent {
  constructor(private eventService: EventService) { }
  imageUrl: string | undefined
  // const myElement = document.getElementById("demo");

  ngOnInit() {
    // this.eventService.testFun()
    // this.eventService.getEvents().subscribe((data:any)=>{
    //   console.log(data)
    // })
  }


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


  
  updatedStatus(eventDetail:any){
    eventDetail.active=!eventDetail.active
    this.eventService.addEvent(eventDetail)
  }
}
