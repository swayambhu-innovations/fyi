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
  hiddenRoutes = ['/login', '/add-address', '/otp', '/profile'];
  showNavbar:any
  constructor(private router: Router){
    this.checkRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }
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
  private checkRoute(url: string) {
    this.showNavbar = !this.hiddenRoutes.some(route => url.includes(route));
  }
  

  }


