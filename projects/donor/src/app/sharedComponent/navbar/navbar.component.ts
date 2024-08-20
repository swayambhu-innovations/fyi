import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DataProviderService } from '../../auth/service/data-provider.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  hiddenRoutes = ['/login', '/add-address', '/otp', '/profile', '/member-detail', 'event-payment', 'payment', 'payment-successful', 'paymentfailed', 'varient'];
  showNavbar: boolean | undefined;
  currentTab: string = 'home';

  constructor(private router: Router, public dataProviderService: DataProviderService) {
    this.checkRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }

  moveToHome() {
    this.currentTab = 'home';
    this.router.navigate(['home']);
  }

  moveTohistory() {
    this.currentTab = 'history';
    this.router.navigate(['history']);
  }

  moveToFeed() {
    this.currentTab = 'feed';
    this.router.navigate(['feed']);
  }

  moveToCoupon() {
    this.currentTab = 'coupon';
    this.router.navigate(['coupon']);
  }

  moveToaccount() {
    this.currentTab = 'account';
    this.router.navigate(['account']);
  }

  private checkRoute(url: string) {
    this.showNavbar = !this.hiddenRoutes.some(route => url.includes(route));

    // Update the currentTab based on the current route
    if (url.includes('home')) {
      this.currentTab = 'home';
    } else if (url.includes('history')) {
      this.currentTab = 'history';
    } else if (url.includes('feed')) {
      this.currentTab = 'feed';
    } else if (url.includes('coupon')) {
      this.currentTab = 'coupon';
    } else if (url.includes('account')) {
      this.currentTab = 'account';
    }
  }
}
