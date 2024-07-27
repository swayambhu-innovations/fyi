import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  events = [
    { title: 'Cearic Kashi Summit 2024', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
    { title: 'Cearic Kashi Summit 2025', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
    { title: 'Cearic Kashi Summit 2026', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
    { title: 'Cearic Kashi Summit 2027', image: '/assets/homepage/sliderimage.svg', link: '/slab-list' },
    // Add more surveys here
  ];

  slabs=[
    { title: 'Panchang slab', image: '/assets/homepage/event_1.1.svg'},
    { title: 'Assi slab', image: '/assets/homepage/event_1.2.svg' },
    { title: 'Assi slab', image: '/assets/homepage/event_1.3.svg'},
  ]
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  seeAllEvent(){
    this.router.navigate(['event-list']);
  }
  onSurveyClick(survey: any): void {
    window.location.href = survey.link;
  }
}
