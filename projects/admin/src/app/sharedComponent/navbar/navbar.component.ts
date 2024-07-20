import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgFor,NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  showNavbar = true;
  hiddenRoutes = ['/login', '/notAdmin','create-catalogue'];

  ngOnInit() {
    this.checkRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkRoute(event.urlAfterRedirects);
      }
    });
  }
  constructor(private router: Router) { }

  items = [ { image: 'assets/navbar/home.svg', type: "Home" ,  image2: 'assets/navbar/home1.svg',path:"home"},
    { image: 'assets/navbar/service.svg', type: "Service" ,image2: 'assets/navbar/service1.svg',path:"service"},
    { image: 'assets/navbar/user.svg', type: "users",image2: 'assets/navbar/user1.svg',path:"users"} ,
    { image: 'assets/navbar/report.svg', type: "Reports",image2: 'assets/navbar/report1.svg',path:"report"},
    { image: 'assets/navbar/feed.svg', type: "Feed",image2: 'assets/navbar/feed1.svg',path:"feed"}]

  activeIndex: number = 0; 

  setActive(index: number,path:string) {
    this.activeIndex = index;
    this.router.navigate(['/', path]);
  }

  private checkRoute(url: string) {
    this.showNavbar = !this.hiddenRoutes.some(route => url.includes(route));
  }

}
