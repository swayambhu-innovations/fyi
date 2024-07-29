import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-receiving-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './receiving-event.component.html',
  styleUrl: './receiving-event.component.scss'
})
export class ReceivingEventComponent {
  constructor(private router:Router){}
  eventdetail=[
    {
      name:'anuj madhav',
      Contact : '9585545823',
      eventName:'Kashi Summit 2024',
      slabName : 'Panchang slab',
      varient:'couple',
      Price: '11021',
      ticketsCount :"3"

    },
    {
      name:'anuj madhav',
      Contact : '9585545823',
      eventName:'Kashi Summit 2024',
      slabName : 'Panchang slab',
      varient:'couple',
      Price: '11021',
      ticketsCount :"3"

    },
    {
      name:'anuj madhav',
      Contact : '9585545823',
      eventName:'Kashi Summit 2024',
      slabName : 'Panchang slab',
      varient:'couple',
      Price: '11021',
      ticketsCount :"3"

    }
  ]
bookingdetail(){
  this.router.navigate(['booking-detail']);
}
}
