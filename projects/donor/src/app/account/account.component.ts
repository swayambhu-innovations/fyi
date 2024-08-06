import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";
import { Router } from '@angular/router';
import { getAuth, deleteUser, Auth, signOut } from '@angular/fire/auth';
import { DataProviderService } from '../auth/service/data-provider.service';
import { NotLoginpageComponent } from '../not-loginpage/not-loginpage.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderWithBackComponent, HeaderWithMenuComponent,NotLoginpageComponent,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(private router: Router,private DataProviderService:DataProviderService){}
  movetoContactUs(){
      this.router.navigate(['ContactUs']);
  }

  logout() {
    signOut(getAuth())
    .then(() => {
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 3000);
    })
    .catch((error: any) => console.log(error))
    
  }
  name: any;
  isLogin:any
  ngOnInit(): void {
    this.isLogin=this.DataProviderService.loggedIn
    setTimeout(() => {
      this.name = this.DataProviderService.currentUser?.userData.name;
    }, 3000);
  } 

  navigate(address: string) {
    this.router.navigate(['profile']);

  }
  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }

 
}
