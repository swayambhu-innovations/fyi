import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventServiceService } from '../event-service.service';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  constructor(private router: Router , private eventservice:EventServiceService) { }
  events: any[] = [];
  ngOnInit(): void {
    this.eventservice.getEvents().subscribe((data:any)=>{                  
      this.events=data;
      console.log(data)
    })
  }

  // events = [
  //   { title: 'Cearic Kashi Summit 2024', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
  //   { title: 'Cearic Kashi Summit 2025', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
  //   { title: 'Cearic Kashi Summit 2026', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
  //   { title: 'Cearic Kashi Summit 2027', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
  //   // Add more surveys here
  // ];

 

 
  seeAllEvent(){
    this.router.navigate(['event-list']);
  }
  onSurveyClick(survey: any): void {
    window.location.href = survey.link;
  }
  viewSlsbList(){
    this.router.navigate(['slab-list']);
  }
}
