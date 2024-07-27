import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor(private router: Router){}
  currentTab: string = 'home';
  moveToHome(){
    this.currentTab = 'home';
    this.router.navigate(['home']);
  }
  moveTodonation(){
    this.currentTab = 'donation';

    this.router.navigate(['donation']);
  }
  moveTofeed(){
    this.currentTab = 'feed';
    this.router.navigate(['feed']);
  }
  moveTocoupon(){
    this.currentTab = 'coupon';
    this.router.navigate(['coupon']);
  }
  moveToaccount(){
    this.currentTab = 'account';
    this.router.navigate(['account']);
  }
  
  

  }


