import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderWithBackComponent } from "../../../sharedComponent/header-with-back/header-with-back.component";
import { EventServiceService } from '../../event-service.service';
@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, HeaderWithBackComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.scss'
})
export class EventListComponent {
  // constructor(private router: Router) { }
  
  // items = [
  //   {
  //     image: '/assets/homepage/eventimage.svg',  // Adjust the path to your image
  //     title: 'Cearic Kashi Summit 2024'
  //   },
  //   {
  //     image: '/assets/homepage/eventlist.svg',  // Adjust the path to your image
  //     title: 'Cearic Kashi Summit 2025'
  //   },
  //   {
  //     image: '/assets/homepage/eventimage.svg',  // Adjust the path to your image
  //     title: 'Cearic Kashi Summit 2026'
  //   }
  // ];
  constructor(private router: Router , private eventservice:EventServiceService) { }
  items: any[] = [];
  ngOnInit(): void {
    this.eventservice.getEvents().subscribe((data:any)=>{                  
      this.items=data;
      console.log(data)
    })
  }
  viewSlsbList(){
    this.router.navigate(['slab-list']);
  }
}
