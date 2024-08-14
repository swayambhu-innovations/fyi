import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-other-services',
  standalone: true,
  imports: [],
  templateUrl: './other-services.component.html',
  styleUrl: './other-services.component.scss'
})
export class OtherServicesComponent {
  constructor(private router: Router) {}

  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  movetoContactUs(){
    this.router.navigate(['ContactUs']);
}
}
