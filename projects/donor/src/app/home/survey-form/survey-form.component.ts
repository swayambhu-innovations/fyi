import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-survey-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './survey-form.component.html',
  styleUrl: './survey-form.component.scss'
})
export class SurveyFormComponent {
  surveys = [
    { title: 'Awareness Survey', image: '/assets/homepage/image1.svg', link: '/awareness-survey' },
    { title: 'Food Survey', image: '/assets/homepage/image2.svg', link: '/food-survey' },
    { title: 'Awareness Survey', image: '/assets/homepage/image1.svg', link: '/awareness-survey' },
    { title: 'Food Survey', image: '/assets/homepage/image2.svg', link: '/food-survey' },
    // Add more surveys here
  ];

  constructor(private router: Router ) { }

  ngOnInit(): void {
  }
  seeAllsurvey(){
    this.router.navigate(['survey-list']);
  }
  onSurveyClick(survey: any): void {
    window.location.href = survey.link;
  }
}
