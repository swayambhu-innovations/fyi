import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";
import { Router } from '@angular/router';
import { getAuth, deleteUser, Auth } from '@angular/fire/auth';
import { DataProviderService } from '../auth/service/data-provider.service';
import { NotLoginpageComponent } from '../not-loginpage/not-loginpage.component';
import { CommonModule } from '@angular/common';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { LogoutModelComponent } from './logout-model/logout-model.component';
import { signOut } from '@aws-amplify/auth';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderWithBackComponent, HeaderWithMenuComponent,NotLoginpageComponent,CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(private router: Router,private DataProviderService:DataProviderService, private _bottomSheet: MatBottomSheet){}
  movetoContactUs(){
      this.router.navigate(['ContactUs']);
  }

  async logout() {

      try {
        await signOut();
        setTimeout(() => {
          this.DataProviderService.currentUser=undefined
          this.router.navigate(['login']);
        }, 3000);
      } catch (error) {
        console.log('error signing out: ', error);
      }
    
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
