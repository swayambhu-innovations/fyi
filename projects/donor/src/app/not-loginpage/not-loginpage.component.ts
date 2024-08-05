import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-loginpage',
  standalone: true,
  imports: [],
  templateUrl: './not-loginpage.component.html',
  styleUrl: './not-loginpage.component.scss'
})
export class NotLoginpageComponent {
constructor(private router:Router){}
  navigatetologin() {
    this.router.navigate(['login']);

  }
}
