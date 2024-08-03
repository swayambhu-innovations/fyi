import { Component } from '@angular/core';
import { HeaderWithBackComponent } from "../sharedComponent/header-with-back/header-with-back.component";
import { HeaderWithMenuComponent } from "../sharedComponent/header-with-menu/header-with-menu.component";
import { Router } from '@angular/router';
import { getAuth, deleteUser, Auth, signOut } from '@angular/fire/auth';



@Component({
  selector: 'app-account',
  standalone: true,
  imports: [HeaderWithBackComponent, HeaderWithMenuComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(private router: Router,){}
  movetoContactUs(){
      this.router.navigate(['ContactUs']);
  }

  logout() {
    console.log('logout')
    signOut(getAuth())
    .then(() => {
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 3000);
    })
    .catch((error: any) => console.log(error))
    
  }
  openInNewTab(url: string): void {
    window.open(url, '_blank');
  }

 
}
