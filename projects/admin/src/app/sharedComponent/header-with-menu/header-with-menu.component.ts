import { Component, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-with-menu',
  standalone: true,
  imports: [],
  templateUrl: './header-with-menu.component.html',
  styleUrl: './header-with-menu.component.scss'
})
export class HeaderWithMenuComponent {
 
  constructor (private authService:AuthService ,private router:Router){}
  name:any
  ngOnInit():void{
    this.authService.user$.subscribe((userData: any | null) => {
      console.log(userData.displayName);
      if (userData) {
        this.name= userData.displayName;
      } 
    });  
  }
  logout(){
    console.log("fdghjk")
    this.authService.signout()
    
  }
}
